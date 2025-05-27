# contact/serializers.py

from rest_framework import serializers
from contact.models import Contact
from communication.serializers import CommunicationChannelSerializer
from communication.models import CommunicationChannel
from client.models import Client

class ContactSerializer(serializers.ModelSerializer):
    channels = CommunicationChannelSerializer(many=True, read_only=True)
    channel_ids = serializers.PrimaryKeyRelatedField(
        queryset=CommunicationChannel.objects.all(),
        source='channels',
        write_only=True,
        many=True
    )

    class Meta:
        model = Contact
        fields = [
            'id',
            'name',
            'phone_number',
            'relationship',
            'email',
            'channels',
            'channel_ids',
        ]

    def create(self, validated_data):
        channel_ids = validated_data.pop('channels', [])
        contact = Contact.objects.create(**validated_data)
        contact.channels.set(channel_ids)
        return contact

    def update(self, instance, validated_data):
        channel_ids = validated_data.pop('channels', None)
        instance = super().update(instance, validated_data)
        if channel_ids is not None:
            instance.channels.set(channel_ids)
        return instance
