from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CommunicationViewSet,
    EmailView,
    SmsView,
    ChannelSendView,
)

router = DefaultRouter()
router.register(r'', CommunicationViewSet)  # rota: /api/clients/

email_patterns = [
    path('send/', EmailView.as_view(), name='send-email'),
]

sms_patterns = [
    path('send/', SmsView.as_view(), name='send-sms'),
]

channel_send_patterns = [
    path('send/', ChannelSendView.as_view(), name='channel-send'),
]

urlpatterns = [
    path('', include(router.urls)),
    path('emails/', include(email_patterns)),
    path('sms/', include(sms_patterns)),
    path('channel_send/', include(channel_send_patterns)),
]
