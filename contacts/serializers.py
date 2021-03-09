from rest_framework import serializers
from  .models import contacts
from django.core.mail import send_mail

class contactSerializer(serializers.ModelSerializer):
    class Meta:
        model = contacts
        fields = '__all__'
   