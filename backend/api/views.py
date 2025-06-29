from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from io import TextIOWrapper
import csv
from users.models import User, StudentProfile, TeacherProfile
from topics.models import Topic, StudentTopicChoice
from .serializers import (
    UserSerializer, StudentProfileSerializer, TeacherProfileSerializer,
    TopicSerializer, StudentTopicChoiceSerializer,
    StudentTopicChoiceWriteSerializer, UserCreateSerializer, UserUpdateSerializer
)
from .permissions import IsAdminUserRole, IsTeacherUserRole, IsStudentUserRole, IsSelfOrAdmin
from .filters import TopicFilter

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = [IsAdminUserRole]
    def get_serializer_class(self):
        if self.action == 'create':
            return UserCreateSerializer
        elif self.action in ['update', 'partial_update']:
            return UserUpdateSerializer
        return UserSerializer

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def me(self, request):
        user = request.user
        full_name = f"{user.last_name} {user.first_name} {user.middle_name}".strip()
        course = None
        group = None

        if user.role == 'student':
            try:
                course = user.student_profile.course
                group = user.student_profile.group
            except StudentProfile.DoesNotExist:
                pass

            data = {
                'id': user.id,
                'fullname': full_name,
                'username': user.username,
                'role': user.role,
                'course': course,
                'group': group
            }

        if user.role == 'teacher':
            try:
                academicDegree = user.teacher_profile.academicDegree
                academicTitle = user.teacher_profile.academicTitle
                jobTitle = user.teacher_profile.jobTitle
            except TeacherProfile.DoesNotExist:
                pass
            data = {
                'id': user.id,
                'fullname': full_name,
                'username': user.username,
                'role': user.role,
                'academicDegree': academicDegree,
                'academicTitle': academicTitle,
                'jobTitle' : jobTitle
            }

        if user.role == 'admin':
            data = {
                'id': user.id,
                'fullname': full_name,
                'username': user.username,
                'role': user.role
            }

        return Response(data)

    @action(detail=False, methods=['post'], url_path='import-students', permission_classes=[IsAdminUserRole])
    def import_students(self, request):
        file = request.FILES.get('file')
        if not file:
            return Response({'error': 'Файл не найден.'}, status=400)

        decoded_file = TextIOWrapper(file.file, encoding='utf-8')
        reader = csv.DictReader(decoded_file)
        created_users = []

        for row in reader:
            try:
                fullname = row['fullname']
                username = row['username']
                course = int(row['course'])
                group = row['group']
                password = row.get('password') or 'defaultpass123'

                data = {
                    'username': username,
                    'role': 'student',
                    'fullname': fullname,
                    'course': course,
                    'group': group,
                    'password': password,
                    're_password': password,
                }

                serializer = UserCreateSerializer(data=data)
                serializer.is_valid(raise_exception=True)
                user = serializer.save()
                created_users.append(user.username)
            except Exception as e:
                return Response({'error': str(e), 'row': row}, status=400)

        return Response({'created': created_users}, status=201)


    @action(detail=False, methods=['post'], url_path='import-teachers', permission_classes=[IsAdminUserRole])
    def import_teachers(self, request):
        file = request.FILES.get('file')
        if not file:
            return Response({'error': 'Файл не найден.'}, status=400)

        decoded_file = TextIOWrapper(file.file, encoding='utf-8')
        reader = csv.DictReader(decoded_file)
        created_users = []

        for row in reader:
            try:
                fullname = row['fullname']
                username = row['username']
                email = row.get('email', '')
                academicDegree = row['academicDegree']
                academicTitle = row['academicTitle']
                jobTitle = row['jobTitle']
                password = row.get('password') or 'defaultpass123'

                data = {
                    'username': username,
                    'email': email,
                    'role': 'teacher',
                    'fullname': fullname,
                    'academicDegree': academicDegree,
                    'academicTitle': academicTitle,
                    'jobTitle': jobTitle,
                    'password': password,
                    're_password': password,
                }

                serializer = UserCreateSerializer(data=data)
                serializer.is_valid(raise_exception=True)
                user = serializer.save()
                created_users.append(user.username)
            except Exception as e:
                return Response({'error': str(e), 'row': row}, status=400)

        return Response({'created': created_users}, status=201)


class StudentProfileViewSet(viewsets.ModelViewSet):
    queryset = StudentProfile.objects.all()
    serializer_class = StudentProfileSerializer
    permission_classes = [IsStudentUserRole | IsAdminUserRole]

class TeacherProfileViewSet(viewsets.ModelViewSet):
    queryset = TeacherProfile.objects.all()
    serializer_class = TeacherProfileSerializer
    permission_classes = [IsTeacherUserRole | IsAdminUserRole]

class TopicViewSet(viewsets.ModelViewSet):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
    permission_classes = [IsTeacherUserRole | IsAdminUserRole]
    filter_backends = [DjangoFilterBackend]
    filterset_class = TopicFilter

    def perform_create(self, serializer):
        teacher_profile = self.request.user.teacher_profile
        serializer.save(teacher=teacher_profile)

    def get_object(self):
        topic = super().get_object()
        if self.request.user.role == 'teacher' and topic.teacher != self.request.user.teacher_profile:
            raise PermissionDenied("Вы можете редактировать или удалять только свои темы.")
        return topic

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        return super().destroy(request, *args, **kwargs)

    @action(detail=False, methods=['get'], url_path='available_by_teacher', permission_classes=[IsAuthenticated, IsStudentUserRole])
    def available_by_teacher(self, request):
        student = request.user.student_profile
        course = student.course

        if course == 1:
            allowed_types = ['coursework', 'both']
        elif course >= 4:
            allowed_types = ['diploma', 'both']
        else:
            allowed_types = ['coursework', 'both']

        topics = Topic.objects.filter(type_work__in=allowed_types).select_related('teacher__user')

        teachers = {}
        for topic in topics:
            teacher = topic.teacher
            teacher_id = teacher.user.id
            teacher_name = teacher.user.get_full_name()

            choice = StudentTopicChoice.objects.filter(topic=topic).select_related('student__user').first()
            if choice:
                status = "подтверждено" if choice.confirmed_by_teacher else "ожидает подтверждения"
                student_name = choice.student.user.get_full_name()
            else:
                status = "ожидается студент"
                student_name = None

            topic_data = {
                "id": topic.id,
                "title": topic.title,
                "description": topic.description,
                "type_work": topic.type_work,
                "status": status,
                "student": student_name
            }

            if teacher_id not in teachers:
                teachers[teacher_id] = {
                    "teacher_id": teacher_id,
                    "fullname": teacher_name,
                    "topics": []
                }

            teachers[teacher_id]["topics"].append(topic_data)

        return Response(list(teachers.values()))


    @action(detail=False, methods=['get'], url_path='my_topics_with_status', permission_classes=[IsAuthenticated, IsTeacherUserRole])
    def my_topics_with_status(self, request):
        teacher = request.user.teacher_profile
        topics = Topic.objects.filter(teacher=teacher)

        results = []
        for topic in topics:
            choice = StudentTopicChoice.objects.filter(topic=topic).first()

            if choice:
                if choice.confirmed_by_teacher:
                    status = "подтверждено"
                else:
                    status = "ожидает подтверждения"
                student_data = {
                    "id": choice.student.user.id,
                    "fullname": choice.student.user.get_full_name(),
                    "group": choice.student.group,
                    "course": choice.student.course,
                }
            else:
                status = "ожидается студент"
                student_data = None

            results.append({
                "id": topic.id,
                "title": topic.title,
                "description": topic.description,
                "type_work": topic.type_work,
                "status": status,
                "student": student_data
            })

        return Response(results)

class StudentTopicChoiceViewSet(viewsets.ModelViewSet):
    queryset = StudentTopicChoice.objects.all()
    permission_classes = [IsStudentUserRole | IsTeacherUserRole | IsAdminUserRole]

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return StudentTopicChoiceWriteSerializer
        return StudentTopicChoiceSerializer

    def perform_create(self, serializer):
        serializer.save()

    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()

        if request.user.role == 'teacher':
            if instance.topic.teacher != request.user.teacher_profile:
                raise PermissionDenied("Вы можете подтверждать только свои темы.")

        return super().partial_update(request, *args, **kwargs)
