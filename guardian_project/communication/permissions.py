# communication/permissions.py
from rest_framework import permissions

class IsAdminUserOnly(permissions.BasePermission):
    """
    Permite acesso apenas a usuários admin (staff=True).
    """

    def has_permission(self, request, view):
        return request.user and request.user.is_staff
