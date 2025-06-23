from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    UserViewSet,
    StudentProfileViewSet,
    TeacherProfileViewSet,
    TopicViewSet,
    StudentTopicChoiceViewSet
    )



router = DefaultRouter()

router.register(r'users', UserViewSet, basename='user')
router.register(r'students', StudentProfileViewSet, basename='student_profile')
router.register(r'teachers', TeacherProfileViewSet, basename='teacher_profile')
router.register(r'topics', TopicViewSet, basename='topic')
router.register(r'student-topic-choices', StudentTopicChoiceViewSet, basename='student-topic-choice')

urlpatterns = [
    path('', include(router.urls)),
    path('', include('djoser.urls')),
    path('auth/', include('djoser.urls.authtoken')),
]