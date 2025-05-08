from django.db import models

class Client(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    default_message = models.TextField(blank=True, null=True)
    active = models.BooleanField(default=True)
    have_plus = models.BooleanField(default=False)

    def __str__(self):
        return self.name