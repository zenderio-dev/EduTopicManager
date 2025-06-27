from rest_framework import serializers
from users.models import User, StudentProfile, TeacherProfile
from topics.models import Topic, StudentTopicChoice

class UserSerializer(serializers.ModelSerializer):
    fullname = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role', 'is_active', 'fullname']

    def get_fullname(self, obj):
        return obj.get_full_name()

    def to_representation(self, instance):
        rep = super().to_representation(instance)

        if instance.role == 'student' and hasattr(instance, 'student_profile'):
            rep['course'] = instance.student_profile.course
            rep['group'] = instance.student_profile.group

        elif instance.role == 'teacher' and hasattr(instance, 'teacher_profile'):
            rep['academicDegree'] = instance.teacher_profile.academicDegree
            rep['academicTitle'] = instance.teacher_profile.academicTitle
            rep['jobTitle'] = instance.teacher_profile.jobTitle

        return rep


class TeacherProfileSerializer(serializers.ModelSerializer):
    fullname = serializers.SerializerMethodField()

    class Meta:
        model = TeacherProfile
        fields = ['user_id', 'fullname', 'academicDegree', 'academicTitle', 'jobTitle']

    def get_fullname(self, obj):
        return f"{obj.user.last_name} {obj.user.first_name} {obj.user.middle_name}" if obj.user.first_name and obj.user.last_name else None

class UserCreateSerializer(serializers.ModelSerializer):
    fullname = serializers.CharField(write_only=True, required=True, help_text="ФИО в формате 'Фамилия Имя Отчество'")
    course = serializers.IntegerField(required=False, min_value=1, max_value=6)
    group = serializers.CharField(required=False, allow_blank=False, max_length=100)

    academicDegree = serializers.CharField(required=False, max_length=100)
    academicTitle = serializers.CharField(required=False, max_length=100)
    jobTitle = serializers.CharField(required=False, max_length=100)

    password = serializers.CharField(write_only=True, required=True, min_length=8)
    re_password = serializers.CharField(write_only=True, required=True, min_length=8)

    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'password', 're_password',
            'role', 'fullname', 'course', 'group',
            'academicDegree', 'academicTitle', 'jobTitle'
        ]
        extra_kwargs = {
            'first_name': {'read_only': True},
            'last_name': {'read_only': True},
            'middle_name': {'read_only': True},
            'email': {'required': False}
        }

    def validate(self, data):
        if data['password'] != data['re_password']:
            raise serializers.ValidationError({'re_password': 'Пароли не совпадают.'})

        if data.get('role') == 'student' and not data.get('course'):
            raise serializers.ValidationError({'course': 'Для студентов необходимо указать курс.'})

        if data.get('role') == 'teacher':
            if not data.get('academicDegree'):
                raise serializers.ValidationError({'academicDegree': 'Для преподавателя необходимо указать ученую степень.'})
            if not data.get('academicTitle'):
                raise serializers.ValidationError({'academicTitle': 'Для преподавателя необходимо указать ученое звание.'})
            if not data.get('jobTitle'):
                raise serializers.ValidationError({'jobTitle': 'Для преподавателя необходимо указать должность.'})

        fullname_parts = data['fullname'].strip().split()
        if len(fullname_parts) < 2:
            raise serializers.ValidationError({'fullname': 'Укажите Фамилию и Имя (обязательно) и Отчество (по желанию)'})

        return data

    def create(self, validated_data):
        fullname = validated_data.pop('fullname')
        name_parts = fullname.strip().split()

        last_name = name_parts[0]
        first_name = name_parts[1]
        middle_name = ' '.join(name_parts[2:]) if len(name_parts) > 2 else ''

        validated_data.update({
            'last_name': last_name,
            'first_name': first_name,
            'middle_name': middle_name
        })

        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email'),
            password=validated_data['password'],
            first_name=first_name,
            last_name=last_name,
            middle_name=middle_name,
            role=validated_data['role']
        )

        if user.role == 'student':
            StudentProfile.objects.create(
                user=user,
                course=validated_data.get('course'),
                group=validated_data.get('group', '')
            )
        elif user.role == 'teacher':
            TeacherProfile.objects.create(
                user=user,
                academicDegree=validated_data.get('academicDegree'),
                academicTitle=validated_data.get('academicTitle'),
                jobTitle=validated_data.get('jobTitle')
            )

        return user

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['fullname'] = instance.get_full_name()
        if hasattr(instance, 'student_profile'):
            representation['course'] = instance.student_profile.course
            representation['group'] = instance.student_profile.group
        if hasattr(instance, 'teacher_profile'):
            representation['academicDegree'] = instance.teacher_profile.academicDegree
            representation['academicTitle'] = instance.teacher_profile.academicTitle
            representation['jobTitle'] = instance.teacher_profile.jobTitle
        return representation

class StudentProfileSerializer(serializers.ModelSerializer):
    fullname = serializers.SerializerMethodField()
    role = serializers.SerializerMethodField()
    group = serializers.CharField()

    class Meta:
        model = StudentProfile
        fields = ['user_id', 'fullname', 'role', 'group', 'course']

    def get_fullname(self, obj):
        return obj.user.get_full_name()


    def get_role(self, obj):
        return obj.user.role

class TopicSerializer(serializers.ModelSerializer):
    status = serializers.SerializerMethodField()
    class Meta:
        model = Topic
        fields = ['id', 'title', 'type_work', 'teacher', 'description', 'status']
        read_only_fields = ['teacher']

    def get_status(self, obj):
        choice = obj.choices.first()
        if choice:
            return "подтверждено" if choice.confirmed_by_teacher else "ожидает подтверждения"
        return "ожидается студент"

class StudentTopicChoiceSerializer(serializers.ModelSerializer):
    student = StudentProfileSerializer()
    topic = TopicSerializer()

    class Meta:
        model = StudentTopicChoice
        fields = ['id', 'student', 'topic', 'confirmed_by_teacher', 'chosen_at']


class StudentTopicChoiceWriteSerializer(serializers.ModelSerializer):
    topic = serializers.PrimaryKeyRelatedField(queryset=Topic.objects.all(), required=False)
    confirmed_by_teacher = serializers.BooleanField(required=False)

    class Meta:
        model = StudentTopicChoice
        fields = ['topic', 'confirmed_by_teacher']

    def validate(self, data):
        request = self.context['request']
        user = request.user

        if request.method == 'POST':
            if not hasattr(user, 'student_profile'):
                raise serializers.ValidationError("Пользователь не является студентом.")
            student = user.student_profile
            topic = data['topic']

            if student.course == 1:
                allowed_types = ['coursework', 'both']
            elif student.course >= 4:
                allowed_types = ['diploma', 'both']
            else:
                allowed_types = ['coursework', 'both']

            if topic.type_work not in allowed_types:
                raise serializers.ValidationError("Тема не подходит для вашего курса.")

            if StudentTopicChoice.objects.filter(topic=topic).exists():
                raise serializers.ValidationError("Эта тема уже выбрана другим студентом.")

        if 'confirmed_by_teacher' in data:
            if not hasattr(user, 'teacher_profile'):
                raise serializers.ValidationError("Подтвердить тему может только преподаватель.")

        return data

    def create(self, validated_data):
        student = self.context['request'].user.student_profile
        topic = validated_data['topic']
        StudentTopicChoice.objects.filter(student=student).delete()
        return StudentTopicChoice.objects.create(student=student, topic=topic)

    def update(self, instance, validated_data):
        if 'confirmed_by_teacher' in validated_data:
            instance.confirmed_by_teacher = validated_data['confirmed_by_teacher']
            instance.save()
        return instance


    def create(self, validated_data):
        student = self.context['request'].user.student_profile
        topic = validated_data['topic']

        StudentTopicChoice.objects.filter(student=student).delete()

        return StudentTopicChoice.objects.create(student=student, topic=topic)



class UserUpdateSerializer(serializers.ModelSerializer):
    fullname = serializers.CharField(write_only=True, required=False)
    full_name = serializers.SerializerMethodField(read_only=True)

    password = serializers.CharField(write_only=True, required=False, min_length=8)
    re_password = serializers.CharField(write_only=True, required=False, min_length=8)

    course = serializers.IntegerField(required=False)
    group = serializers.CharField(required=False, max_length=100)

    academicDegree = serializers.CharField(required=False, max_length=100)
    academicTitle = serializers.CharField(required=False, max_length=100)
    jobTitle = serializers.CharField(required=False, max_length=100)

    email = serializers.EmailField(required=False)

    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'role',
            'fullname', 'full_name', 'course', 'group',
            'academicDegree', 'academicTitle', 'jobTitle',
            'password', 're_password'
        ]

    def get_full_name(self, obj):
        return obj.get_full_name()

    def validate(self, data):
        role = data.get('role', self.instance.role)

        if 'password' in data or 're_password' in data:
            if data.get('password') != data.get('re_password'):
                raise serializers.ValidationError({'re_password': 'Пароли не совпадают.'})

            request_user = self.context['request'].user
            if not (request_user.is_superuser or request_user.role == 'admin'):
                raise serializers.ValidationError({'password': 'Изменять пароль может только администратор.'})

        fullname = data.get('fullname')
        if fullname:
            parts = fullname.strip().split()
            if len(parts) < 2:
                raise serializers.ValidationError({'fullname': 'Укажите Фамилию и Имя (обязательно) и Отчество (по желанию).'})

        if role == 'student':
            if 'course' in data and not isinstance(data['course'], int):
                raise serializers.ValidationError({'course': 'Курс должен быть целым числом.'})
            if 'group' in data and not data['group']:
                raise serializers.ValidationError({'group': 'Название группы не может быть пустым.'})

        if role == 'teacher':
            for field in ['academicDegree', 'academicTitle', 'jobTitle']:
                if field in data and not data[field]:
                    raise serializers.ValidationError({field: f'Поле "{field}" не может быть пустым.'})

        return data

    def update(self, instance, validated_data):
        fullname = validated_data.pop('fullname', None)
        if fullname:
            parts = fullname.strip().split()
            instance.last_name = parts[0]
            instance.first_name = parts[1] if len(parts) > 1 else ''
            instance.middle_name = ' '.join(parts[2:]) if len(parts) > 2 else ''

        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.role = validated_data.get('role', instance.role)
        instance.save()

        password = validated_data.get('password')
        if password:
            instance.set_password(password)
            instance.save()

        if instance.role == 'student':
            profile, _ = StudentProfile.objects.get_or_create(user=instance)
            if 'course' in validated_data:
                profile.course = validated_data['course']
            if 'group' in validated_data:
                profile.group = validated_data['group']
            profile.save()

        elif instance.role == 'teacher':
            profile, _ = TeacherProfile.objects.get_or_create(user=instance)
            if 'academicDegree' in validated_data:
                profile.academicDegree = validated_data['academicDegree']
            if 'academicTitle' in validated_data:
                profile.academicTitle = validated_data['academicTitle']
            if 'jobTitle' in validated_data:
                profile.jobTitle = validated_data['jobTitle']
            profile.save()

        return instance

    def to_representation(self, instance):
        rep = super().to_representation(instance)

        if instance.role == 'student' and hasattr(instance, 'student_profile'):
            rep['course'] = instance.student_profile.course
            rep['group'] = instance.student_profile.group

        elif instance.role == 'teacher' and hasattr(instance, 'teacher_profile'):
            rep['academicDegree'] = instance.teacher_profile.academicDegree
            rep['academicTitle'] = instance.teacher_profile.academicTitle
            rep['jobTitle'] = instance.teacher_profile.jobTitle

        return rep






