from rest_framework import serializers
from users.models import User, StudentProfile, TeacherProfile
from topics.models import Topic, StudentTopicChoice

# --- USER SERIALIZERS ---
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role', 'is_active']

class UserCreateSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    middle_name = serializers.CharField(required=True)
    course = serializers.IntegerField(required=False, min_value=1, max_value=6)
    group_name = serializers.CharField(required=False, allow_blank=False, max_length=100)

    password = serializers.CharField(write_only=True, required=True, min_length=8)
    re_password = serializers.CharField(write_only=True, required=True, min_length=8)

    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'password', 're_password',
            'role', 'first_name', 'last_name', 'middle_name', 'course', 'group_name'
        ]

    def validate(self, data):
        role = data.get('role')
        course = data.get('course')
        password = data.get('password')
        re_password = data.get('re_password')

        if role == 'student' and course is None:
            raise serializers.ValidationError({'course': 'Для студентов необходимо указать курс.'})

        if password != re_password:
            raise serializers.ValidationError({'re_password': 'Пароли не совпадают.'})

        return data

    def create(self, validated_data):
        course = validated_data.pop('course', None)
        group_name = validated_data.pop('group_name', None)  # Удаляем group_name из validated_data
        validated_data.pop('re_password', None)
        password = validated_data.pop('password')

        # Убедитесь, что username передается только один раз
        username = validated_data.pop('username')  # Извлекаем username отдельно
        email = validated_data.pop('email', None)  # Извлекаем email отдельно

        user = User.objects.create_user(
            username=username,  # Передаем username
            email=email,  # Передаем email
            password=password,
            **validated_data  # Передаем остальные поля
        )

        if user.role == 'student' and course:
            StudentProfile.objects.create(user=user, course=course, group_name=group_name)  # Передаем group_name только для студентов
        elif user.role == 'teacher':
            TeacherProfile.objects.create(user=user)
        elif user.role == 'admin':
            pass

        return user


class StudentProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = StudentProfile
        fields = ['id', 'user', 'course']

class TeacherProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = TeacherProfile
        fields = ['id', 'user', 'degree', 'title', 'position']

# --- TOPIC SERIALIZER ---
class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = ['id', 'title', 'type_work', 'teacher', 'deadline']

# --- STUDENT TOPIC CHOICE SERIALIZER ---
class StudentTopicChoiceSerializer(serializers.ModelSerializer):
    student = StudentProfileSerializer()
    topic = TopicSerializer()

    class Meta:
        model = StudentTopicChoice
        fields = ['id', 'student', 'topic', 'confirmed_by_teacher', 'chosen_at']

class StudentTopicChoiceWriteSerializer(serializers.ModelSerializer):
    student = serializers.PrimaryKeyRelatedField(queryset=StudentProfile.objects.all())
    topic = serializers.PrimaryKeyRelatedField(queryset=Topic.objects.all())

    class Meta:
        model = StudentTopicChoice
        fields = ['student', 'topic']

    def validate(self, data):
        student = data['student']
        topic = data['topic']

        if student.course == 1:
            allowed_types = ['coursework', 'both']
        elif student.course >= 4:
            allowed_types = ['diploma', 'both']
        else:
            allowed_types = ['coursework', 'both']

        if topic.type_work not in allowed_types:
            raise serializers.ValidationError("Тема не доступна для курса данного студента.")
        return data

    def create(self, validated_data):
        student = validated_data['student']
        StudentTopicChoice.objects.filter(student=student).delete()
        return super().create(validated_data)
