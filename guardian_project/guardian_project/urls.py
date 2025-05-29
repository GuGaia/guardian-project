from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/clients/', include('client.urls')),
    path('api/communications/', include('communication.urls')),
    path('api/', include('auth_app.urls')), 
]
