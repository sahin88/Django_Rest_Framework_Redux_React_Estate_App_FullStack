from django.db import models
from django.utils import timezone


class contacts(models.Model):
    name = models.CharField(max_length=250)
    email = models.CharField(max_length=150)
    subject = models.CharField(max_length=150)
    message = models.TextField(blank=True)
    contact_date = models.DateTimeField(default=timezone.now, blank=True)

    def __str__(self):
        return self.name
