from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CommunicationViewSet

router = DefaultRouter()
router.register(r'', CommunicationViewSet)  # rota: /api/clients/

urlpatterns = [
    path('', include(router.urls)),
]
