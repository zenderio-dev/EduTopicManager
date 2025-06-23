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

    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'password',
            'role', 'first_name', 'last_name', 'middle_name', 'course'
        ]
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, data):
        role = data.get('role')
        course = data.get('course')

        if role == 'student' and course is None:
            raise serializers.ValidationError({'course': 'Для студентов необходимо указать курс.'})
        return data

    def create(self, validated_data):
        course = validated_data.pop('course', None)
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()

        if user.role == 'student' and course:
            StudentProfile.objects.create(user=user, course=course)
        elif user.role == 'teacher':
            TeacherProfile.objects.create(user=user)
        elif user.role == 'admin':
            # Если нужны отдельные профили для админа — можно добавить. Пока просто создаём User.
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
