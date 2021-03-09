from django.shortcuts import render
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.views import APIView
from django.core.mail import send_mail,send_mass_mail
from .models import contacts
from rest_framework import permissions
from .serializers import contactSerializer
import os

from rest_framework import generics
class contactCreateandMailSend(generics.GenericAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = contactSerializer
    def post(self, request, format=None):
        serializer = contactSerializer(data=request.data)
        try:
            serializer.is_valid()        
            serializer.save()
            send_mail( 
            subject=serializer.data['subject'],
            message=serializer.data['message'],
            from_email = serializer.data['email'], 
            recipient_list = [os.environ.get('DB_USER')],
            fail_silently=False,)
            return JsonResponse({'sucesss': 'Message has been sent'})
        except Exception as e:
            return JsonResponse({'errors': e})
          
            


# Create your views here.
