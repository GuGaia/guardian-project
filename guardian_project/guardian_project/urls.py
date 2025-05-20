from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/clients/', include('client.urls')),                   
    path('api/clients/<int:client_pk>/contacts/',
         include('contact.urls')),
    path('api/communications/', include('communication.urls')),
]
