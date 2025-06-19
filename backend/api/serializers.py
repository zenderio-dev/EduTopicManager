from rest_framework import serializers
from users.models import User, StudentProfile, TeacherProfile
from topics.models import Group, Topic, StudentTopicChoice

# --- USER SERIALIZERS ---
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role', 'is_active']

class StudentProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = StudentProfile
        fields = ['id', 'user', 'group', 'course']

class TeacherProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = TeacherProfile
        fields = ['id', 'user', 'degree', 'title', 'position']

# --- GROUP SERIALIZER ---
class GroupSerializer(serializers.ModelSerializer):
    teacher = TeacherProfileSerializer()

    class Meta:
        model = Group
        fields = ['id', 'name', 'teacher']

# --- TOPIC SERIALIZER ---
class TopicSerializer(serializers.ModelSerializer):
    group = GroupSerializer()

    class Meta:
        model = Topic
        fields = ['id', 'title', 'group', 'deadline']

# --- STUDENT TOPIC CHOICE SERIALIZER ---
class StudentTopicChoiceSerializer(serializers.ModelSerializer):
    student = StudentProfileSerializer()
    topic = TopicSerializer()

    class Meta:
        model = StudentTopicChoice
        fields = ['id', 'student', 'topic', 'confirmed_by_teacher', 'chosen_at']
