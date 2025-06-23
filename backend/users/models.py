from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _

class User(AbstractUser):
    ROLE_CHOICES = (
        ('student', _('Студент')),
        ('teacher', _('Преподаватель')),
        ('admin', _('Администратор')),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, verbose_name=_('Роль'))
    middle_name = models.CharField(max_length=150, blank=True, verbose_name=_('Отчество'))

    groups = None  # Отключаем groups
    user_permissions = None  # Отключаем user_permissions

    class Meta:
        verbose_name = _('Пользователь')
        verbose_name_plural = _('Пользователи')

    def __str__(self):
        return f"{self.get_full_name()} ({self.get_role_display()})"

    def get_full_name(self):
        return f"{self.last_name} {self.first_name} {self.middle_name}".strip()

class StudentProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='student_profile', verbose_name=_('Пользователь'))
    course = models.PositiveSmallIntegerField(verbose_name=_('Курс'))

    class Meta:
        verbose_name = _('Профиль студента')
        verbose_name_plural = _('Профили студентов')

    def __str__(self):
        return f"{self.user.get_full_name()} (Курс {self.course})"

class TeacherProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='teacher_profile', verbose_name=_('Пользователь'))
    degree = models.CharField(max_length=100, blank=True, verbose_name=_('Степень'))
    title = models.CharField(max_length=100, blank=True, verbose_name=_('Звание'))
    position = models.CharField(max_length=100, blank=True, verbose_name=_('Должность'))

    class Meta:
        verbose_name = _('Профиль преподавателя')
        verbose_name_plural = _('Профили преподавателей')

    def __str__(self):
        return self.user.get_full_name()
