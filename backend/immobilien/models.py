from django.db import models
from django.utils import timezone


class immobilien(models.Model):

    name = models.CharField(max_length=50)
    photo = models.ImageField(upload_to='photos/sellers')
    description = models.TextField(blank=True)
    email = models.CharField(max_length=25)
    phone = models.CharField(max_length=70)
    topseller = models.BooleanField(default=False)

    date_joined = models.DateTimeField(
        verbose_name='date_time_joined', default=timezone.now)

    def __str__(self):
        return self.name
