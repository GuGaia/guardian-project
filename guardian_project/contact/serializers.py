from rest_framework import serializers
from contact.models import Contact
from communication.serializers import CommunicationChannelSerializer
from communication.models import CommunicationChannel

class ContactSerializer(serializers.ModelSerializer):
    channel = CommunicationChannelSerializer(read_only=True)
    channel_id = serializers.PrimaryKeyRelatedField(
        queryset=CommunicationChannel.objects.all(),
        source='channel',
        write_only=True
    )

    class Meta:
        model = Contact
        fields = ['id', 'name', 'phone_number', 'relationship', 'plataform', 'channel', 'channel_id', 'client']
