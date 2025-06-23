from django.contrib import admin
from .models import Topic, StudentTopicChoice
from django.utils.translation import gettext_lazy as _

@admin.register(Topic)
class TopicAdmin(admin.ModelAdmin):
    list_display = ('title', 'type_work', 'teacher', 'deadline')
    list_filter = ('type_work', 'teacher')
    search_fields = ('title',)

@admin.register(StudentTopicChoice)
class StudentTopicChoiceAdmin(admin.ModelAdmin):
    list_display = ('student', 'topic', 'confirmed_by_teacher', 'chosen_at')
    list_filter = ('confirmed_by_teacher', 'topic__type_work')
    search_fields = ('student__user__username', 'topic__title')
    actions = ['confirm_selected']

    def confirm_selected(self, request, queryset):
        updated = queryset.update(confirmed_by_teacher=True)
        self.message_user(request, _(f'Подтверждено {updated} выборов темы.'))
    confirm_selected.short_description = _('Подтвердить выбор темы')
