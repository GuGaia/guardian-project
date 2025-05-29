# client/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ClientViewSet
from contact.urls import urlpatterns as contact_patterns

router = DefaultRouter()
router.register(r'', ClientViewSet, basename='client')

urlpatterns = [
    path('', include(router.urls)),
    path('<int:client_pk>/contacts/',       include((contact_patterns, 'contact'))),
]
