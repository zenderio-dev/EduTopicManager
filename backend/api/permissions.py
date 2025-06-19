from rest_framework import permissions

class IsAdminUserRole(permissions.BasePermission):
    """
    Пользователь с ролью admin (не Django superuser)
    """
    def has_permission(self, request, view):
        return bool(request.user.is_authenticated and request.user.role == 'admin')

class IsTeacherUserRole(permissions.BasePermission):
    """
    Пользователь с ролью teacher
    """
    def has_permission(self, request, view):
        return bool(request.user.is_authenticated and request.user.role == 'teacher')

class IsStudentUserRole(permissions.BasePermission):
    """
    Пользователь с ролью student
    """
    def has_permission(self, request, view):
        return bool(request.user.is_authenticated and request.user.role == 'student')

class IsSelfOrAdmin(permissions.BasePermission):
    """
    Пользователь может изменять свои данные или админ может изменять кого угодно
    """
    def has_object_permission(self, request, view, obj):
        return (
            request.user.role == 'admin' or
            obj == request.user
        )
