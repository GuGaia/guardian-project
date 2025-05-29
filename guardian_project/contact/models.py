# contacts/models.py
from django.db import models
from django.contrib.postgres.fields import ArrayField
from client.models import Client
from communication.models import CommunicationChannel

class Contact(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='contacts')
    name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=20)
    relationship = models.CharField(max_length=50)
    channels = models.ManyToManyField(CommunicationChannel, related_name='contacts')
    # channel = models.ForeignKey(CommunicationChannel, related_name='contacts', on_delete=models.CASCADE)
    email = models.EmailField(blank=True, null=True)

    def __str__(self):
        channel_names = ", ".join([channel.name for channel in self.channels.all()])
        return f"{self.name} ({self.client.name})  {channel_names}"
