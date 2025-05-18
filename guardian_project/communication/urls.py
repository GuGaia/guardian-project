from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CommunicationViewSet,
    EmailView,
    SmsView,
)

router = DefaultRouter()
router.register(r'', CommunicationViewSet)  # rota: /api/clients/

email_patterns = [
    path('send/', EmailView.as_view(), name='send-email'),
]

sms_patterns = [
    path('send/', SmsView.as_view(), name='send-sms'),
]

urlpatterns = [
    path('', include(router.urls)),
    path('emails/', include(email_patterns)),
    path('sms/', include(sms_patterns)),
]
