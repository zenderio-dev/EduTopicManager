from django_filters import rest_framework as filters
from topics.models import Topic

class TopicFilter(filters.FilterSet):

    class Meta:
        model = Topic
        fields = []

    def filter_queryset(self, queryset):
        user = self.request.user
        if not user.is_authenticated or user.role != 'student':
            return queryset

        try:
            course = user.student_profile.course
        except Exception:
            return queryset.none()

        if course == 1:
            return queryset.filter(type_work__in=['coursework', 'both'])
        elif course >= 4:
            return queryset.filter(type_work__in=['diploma', 'both'])
        else:
            return queryset.filter(type_work__in=['coursework', 'both'])
