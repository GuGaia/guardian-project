from rest_framework import serializers
from communication.models import CommunicationChannel

class CommunicationChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommunicationChannel
        fields = ['id', 'name']
