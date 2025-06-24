from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from users.models import User, StudentProfile, TeacherProfile
from topics.models import Topic, StudentTopicChoice
from .serializers import (
    UserSerializer, StudentProfileSerializer, TeacherProfileSerializer,
    TopicSerializer, StudentTopicChoiceSerializer,
    StudentTopicChoiceWriteSerializer, UserCreateSerializer
)
from .permissions import IsAdminUserRole, IsTeacherUserRole, IsStudentUserRole, IsSelfOrAdmin
from .filters import TopicFilter

# --- USER ---
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = [IsAdminUserRole]  # управлять юзерами может только админ
    def get_serializer_class(self):
        if self.action == 'create':
            return UserCreateSerializer
        return UserSerializer

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def me(self, request):
        user = request.user
        full_name = f"{user.last_name} {user.first_name} {user.middle_name}".strip()
        course = None

        if user.role == 'student':
            try:
                course = user.student_profile.course
            except StudentProfile.DoesNotExist:
                course = None

        data = {
            'id': user.id,
            'fullName': full_name,
            'username': user.username,
            'role': user.role,
            'course': course
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

# --- STUDENT TOPIC CHOICE ---
class StudentTopicChoiceViewSet(viewsets.ModelViewSet):
    queryset = StudentTopicChoice.objects.all()
    permission_classes = [IsStudentUserRole | IsTeacherUserRole | IsAdminUserRole]

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return StudentTopicChoiceWriteSerializer
        return StudentTopicChoiceSerializer
