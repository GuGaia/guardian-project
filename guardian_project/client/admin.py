from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Client

class ClientAdmin(UserAdmin):
    model = Client
    list_display = ("email", "name", "is_staff", "is_superuser", "active", "have_plus")
    list_filter = ("is_staff", "is_superuser", "active", "have_plus")
    fieldsets = (
        (None, {"fields": ("email", "password", "name", "default_message")}),
        ("Permissions", {"fields": ("is_staff", "is_active", "is_superuser", "groups", "user_permissions")}),
    )
    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": ("email", "name", "password1", "password2", "is_staff", "is_active")}
        ),
    )
    search_fields = ("email",)
    ordering = ("email",)

admin.site.register(Client, ClientAdmin)
