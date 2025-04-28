from rest_framework import permissions

class IsPremiumUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and getattr(request.user, 'is_premium', False)
