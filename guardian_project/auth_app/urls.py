# auth_app/urls.py

from django.urls import path
from .views import login_view
from .views import init_admin

urlpatterns = [
    path('login/', login_view, name='login'),
    path('init-admin/', init_admin),
]
