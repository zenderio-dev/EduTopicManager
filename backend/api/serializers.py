from rest_framework import serializers
from users.models import User, StudentProfile, TeacherProfile
from topics.models import Topic, StudentTopicChoice


# --- USER SERIALIZERS ---
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role', 'is_active', 'first_name', 'last_name', 'middle_name']

class UserCreateSerializer(serializers.ModelSerializer):
    fullname = serializers.CharField(write_only=True, required=True, help_text="ФИО в формате 'Фамилия Имя Отчество'")
    course = serializers.IntegerField(required=False, min_value=1, max_value=6)
    group_name = serializers.CharField(required=False, allow_blank=False, max_length=100)

    password = serializers.CharField(write_only=True, required=True, min_length=8)
    re_password = serializers.CharField(write_only=True, required=True, min_length=8)

    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'password', 're_password',
            'role', 'fullname', 'course', 'group_name'
        ]
        extra_kwargs = {
            'first_name': {'read_only': True},
            'last_name': {'read_only': True},
            'middle_name': {'read_only': True}
        }

    def validate(self, data):
        # Проверка паролей
        if data['password'] != data['re_password']:
            raise serializers.ValidationError({'re_password': 'Пароли не совпадают.'})

        # Проверка для студентов
        if data.get('role') == 'student' and not data.get('course'):
            raise serializers.ValidationError({'course': 'Для студентов необходимо указать курс.'})

        # Проверка формата ФИО
        fullname_parts = data['fullname'].strip().split()
        if len(fullname_parts) < 2:
            raise serializers.ValidationError({'fullname': 'Укажите Фамилию и Имя (обязательно) и Отчество (по желанию)'})

        return data

    def create(self, validated_data):
        # Извлекаем и обрабатываем ФИО
        fullname = validated_data.pop('fullname')
        name_parts = fullname.strip().split()

        last_name = name_parts[0]
        first_name = name_parts[1]
        middle_name = ' '.join(name_parts[2:]) if len(name_parts) > 2 else ''

        # Подготовка данных для создания пользователя
        validated_data.update({
            'last_name': last_name,
            'first_name': first_name,
            'middle_name': middle_name
        })

        # Создаем пользователя
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=first_name,
            last_name=last_name,
            middle_name=middle_name,
            role=validated_data['role']
        )

        # Создаем профиль
        if user.role == 'student':
            StudentProfile.objects.create(
                user=user,
                course=validated_data.get('course'),
                group_name=validated_data.get('group_name', '')
            )
        elif user.role == 'teacher':
            TeacherProfile.objects.create(user=user)

        return user

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['fullname'] = instance.get_full_name()
        if hasattr(instance, 'student_profile'):
            representation['course'] = instance.student_profile.course
            representation['group_name'] = instance.student_profile.group_name
        return representation




class StudentProfileSerializer(serializers.ModelSerializer):
    fullName = serializers.SerializerMethodField()
    role = serializers.SerializerMethodField()
    group = serializers.CharField(source='group_name')

    class Meta:
        model = StudentProfile
        fields = ['id', 'fullName', 'role', 'group', 'course']

    def get_fullName(self, obj):
        return obj.user.get_full_name()

    def get_role(self, obj):
        return obj.user.role

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
