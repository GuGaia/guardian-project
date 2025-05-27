from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CommunicationViewSet,
    ChannelSendView,
)

router = DefaultRouter()
router.register(r'', CommunicationViewSet)  # rota: /api/clients/

channel_send_patterns = [
    path('send/', ChannelSendView.as_view(), name='channel-send'),
]

urlpatterns = [
    path('', include(router.urls)),
    path('alert/', include(channel_send_patterns)),
]