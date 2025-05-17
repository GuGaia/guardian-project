from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CommunicationViewSet,
    EmailView,
)

router = DefaultRouter()
router.register(r'', CommunicationViewSet)  # rota: /api/clients/

email_patterns = [
    path('send/', EmailView.as_view(), name='send-email'),
]

urlpatterns = [
    path('', include(router.urls)),
    path('emails/', include(email_patterns)),
]
