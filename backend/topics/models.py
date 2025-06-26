from django.db import models
from users.models import TeacherProfile, StudentProfile
from django.utils.translation import gettext_lazy as _

class Topic(models.Model):
    TYPE_CHOICES = [
        ('coursework', _('Курсовая')),
        ('diploma', _('Дипломная')),
        ('both', _('Курсовая + Дипломная')),
    ]

    title = models.CharField(max_length=500, verbose_name=_('Название'))
    teacher = models.ForeignKey(TeacherProfile, on_delete=models.CASCADE, related_name='topics', verbose_name=_('Преподаватель'))
    type_work = models.CharField(max_length=20, choices=TYPE_CHOICES, verbose_name=_('Тип работы'))
    description = models.TextField(blank=True, verbose_name='Описание темы')

    class Meta:
        verbose_name = _('Тема')
        verbose_name_plural = _('Темы')

    def __str__(self):
        return f"{self.title} ({self.get_type_work_display()})"

class StudentTopicChoice(models.Model):
    student = models.OneToOneField(StudentProfile, on_delete=models.CASCADE, related_name='topic_choice', verbose_name=_('Студент'))
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE, related_name='choices', verbose_name=_('Тема'))
    confirmed_by_teacher = models.BooleanField(default=False, verbose_name=_('Подтверждено преподавателем'))
    chosen_at = models.DateTimeField(auto_now_add=True, verbose_name=_('Дата выбора'))

    class Meta:
        verbose_name = _('Выбор темы студентом')
        verbose_name_plural = _('Выборы тем студентами')

    def __str__(self):
        return f"{self.student.user.username} -> {self.topic.title}"
