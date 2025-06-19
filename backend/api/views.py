from rest_framework import viewsets
from users.models import User, StudentProfile, TeacherProfile
from topics.models import Group, Topic, StudentTopicChoice
from .serializers import (
    UserSerializer, StudentProfileSerializer, TeacherProfileSerializer,
    GroupSerializer, TopicSerializer, StudentTopicChoiceSerializer,
    StudentTopicChoiceWriteSerializer
)
from .permissions import IsAdminUserRole, IsTeacherUserRole, IsStudentUserRole, IsSelfOrAdmin

# --- USER ---
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUserRole]  # регистрировать / управлять юзерами может только наш админ

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

# --- GROUP ---
class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [IsTeacherUserRole | IsAdminUserRole]

# --- TOPIC ---
class TopicViewSet(viewsets.ModelViewSet):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
    permission_classes = [IsTeacherUserRole | IsAdminUserRole]

# --- STUDENT TOPIC CHOICE ---
class StudentTopicChoiceViewSet(viewsets.ModelViewSet):
    queryset = StudentTopicChoice.objects.all()
    permission_classes = [IsStudentUserRole | IsTeacherUserRole | IsAdminUserRole]

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return StudentTopicChoiceWriteSerializer
        return StudentTopicChoiceSerializer
