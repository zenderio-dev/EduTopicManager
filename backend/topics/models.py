from django.db import models
from users.models import TeacherProfile, StudentProfile

class Topic(models.Model):
    TYPE_CHOICES = [
        ('coursework', 'Курсовая'),
        ('diploma', 'Дипломная'),
        ('both', 'Курсовая + Дипломная'),
    ]

    title = models.CharField(max_length=500)
    teacher = models.ForeignKey(TeacherProfile, on_delete=models.CASCADE, related_name='topics')
    type_work = models.CharField(max_length=10, choices=TYPE_CHOICES)
    deadline = models.DateField(null=True, blank=True)

    def __str__(self):
        return f"{self.title} ({self.get_type_work_display()})"


class StudentTopicChoice(models.Model):
    student = models.OneToOneField(StudentProfile, on_delete=models.CASCADE, related_name='topic_choice')
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE, related_name='choices')
    confirmed_by_teacher = models.BooleanField(default=False)
    chosen_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.student.user.username} -> {self.topic.title}"
