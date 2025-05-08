# contacts/models.py
from django.db import models
from django.contrib.postgres.fields import ArrayField

class Contact(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='contacts')
    name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=20)
    plataform = models.CharField(max_length=20)
    relationship = models.CharField(max_length=50)

    def __str__(self):
        return f'{self.name} ({self.client.name})'
