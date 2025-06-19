from django.db import models

class Group(models.Model):
    name = models.CharField(max_length=100, unique=True)
    teacher = models.ForeignKey('users.TeacherProfile', on_delete=models.CASCADE, related_name='groups')

    def __str__(self):
        return self.name

class Topic(models.Model):
    title = models.CharField(max_length=500)
    group = models.ForeignKey(Group, on_delete=models.CASCADE, related_name='topics')
    deadline = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.title

class StudentTopicChoice(models.Model):
    student = models.OneToOneField('users.StudentProfile', on_delete=models.CASCADE, related_name='topic_choice')
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE, related_name='choices')
    confirmed_by_teacher = models.BooleanField(default=False)
    chosen_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.student.user.username} -> {self.topic.title}"
