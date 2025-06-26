from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from users.models import User, StudentProfile, TeacherProfile
from topics.models import Topic, StudentTopicChoice
from .serializers import (
    UserSerializer, StudentProfileSerializer, TeacherProfileSerializer,
    TopicSerializer, StudentTopicChoiceSerializer,
    StudentTopicChoiceWriteSerializer, UserCreateSerializer, UserUpdateSerializer
)
from .permissions import IsAdminUserRole, IsTeacherUserRole, IsStudentUserRole, IsSelfOrAdmin
from .filters import TopicFilter

# --- USER ---
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

# --- STUDENT PROFILE ---
class StudentProfileViewSet(viewsets.ModelViewSet):
    queryset = StudentProfile.objects.all()
    serializer_class = StudentProfileSerializer
    permission_classes = [IsStudentUserRole | IsAdminUserRole]

# --- TEACHER PROFILE ---
class TeacherProfileViewSet(viewsets.ModelViewSet):
    queryset = TeacherProfile.objects.all()
    serializer_class = TeacherProfileSerializer
    permission_classes = [IsTeacherUserRole | IsAdminUserRole]

# --- TOPIC ---
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

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def available_by_teacher(self, request):
        user = request.user

        # ✅ Проверка роли
        if user.role != 'student':
            return Response({'detail': 'Доступ разрешён только студентам.'}, status=403)

        try:
            student = user.student_profile
        except StudentProfile.DoesNotExist:
            return Response({'detail': 'Профиль студента не найден.'}, status=400)

        # ✅ Определяем доступные типы тем
        if student.course >= 4:
            allowed_types = ['diploma', 'both']
        else:
            allowed_types = ['coursework', 'both']

        # ✅ Получаем темы с фильтрацией по типу
        topics = Topic.objects.filter(type_work__in=allowed_types)

        # ✅ Группируем темы по преподавателю
        result = {}
        for topic in topics:
            teacher = topic.teacher
            if teacher.user_id not in result:
                result[teacher.user_id] = {
                    'teacher_id': teacher.user_id,
                    'fullname': teacher.user.get_full_name(),
                    'topics': []
                }

            result[teacher.user_id]['topics'].append({
                'id': topic.id,
                'title': topic.title,
                'description': topic.description,
                'type_work': topic.type_work
            })

        return Response(list(result.values()))

# --- STUDENT TOPIC CHOICE ---
class StudentTopicChoiceViewSet(viewsets.ModelViewSet):
    queryset = StudentTopicChoice.objects.all()
    permission_classes = [IsStudentUserRole | IsTeacherUserRole | IsAdminUserRole]

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return StudentTopicChoiceWriteSerializer
        return StudentTopicChoiceSerializer
