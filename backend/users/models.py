from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from django.utils.translation import gettext_lazy as _

class UserManager(BaseUserManager):
    use_in_migrations = True

    def create_user(self, username, email=None, password=None, **extra_fields):
        if not username:
            raise ValueError('The given username must be set')
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('role', 'admin')

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(username, email, password, **extra_fields)


class User(AbstractUser):
    ROLE_CHOICES = (
        ('student', _('Студент')),
        ('teacher', _('Преподаватель')),
        ('admin', _('Администратор')),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, verbose_name=_('Роль'))
    middle_name = models.CharField(max_length=150, blank=True, verbose_name=_('Отчество'))
    email = models.EmailField(_('email address'), unique=False, blank=True)

    objects = UserManager()

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
    group_name = models.CharField(max_length=100, verbose_name=_('Группа'), default='безгрупная мразь')


    class Meta:
        verbose_name = _('Профиль студента')
        verbose_name_plural = _('Профили студентов')

    def __str__(self):
        return f"{self.user.get_full_name()} (Курс {self.course}, Группа {self.group_name})"



class TeacherProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='teacher_profile',
                              verbose_name=_('Пользователь'))
    academicDegree = models.CharField(
        max_length=100,
        verbose_name=_('Ученая степень'),
        blank=True,
        null=True,
        default=None  # Добавлено
    )
    academicTitle = models.CharField(
        max_length=100,
        verbose_name=_('Ученое звание'),
        blank=True,
        null=True,
        default=None  # Добавлено
    )
    jobTitle = models.CharField(
        max_length=100,
        verbose_name=_('Должность'),
        blank=True,
        null=True,
        default=None  # Добавлено
    )
    class Meta:
        verbose_name = _('Профиль преподавателя')
        verbose_name_plural = _('Профили преподавателей')
    def __str__(self):
        return self.user.get_full_name()
