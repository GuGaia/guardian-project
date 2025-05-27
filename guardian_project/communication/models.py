from django.db import models

class CommunicationChannel(models.Model):
    name = models.CharField(max_length=50)  # Ex: Email, WhatsApp, etc.

    def __str__(self):
        return self.name
