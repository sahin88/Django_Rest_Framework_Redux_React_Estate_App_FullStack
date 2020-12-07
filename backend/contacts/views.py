from django.shortcuts import render
from rest_framework.response import Response

from rest_framework.views import APIView
from django.core.mail import send_mail
from .models import contacts
from rest_framework import permissions


class contactCreateandMailSend(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        data = request.data
        try:
            send_mail(data['subject'], 'Name :'+data['name']+'\n\n'+data['email']+'\n\n\n\n' +
                      data['message'], data['email'],[data['email']])
            contact = contacts(name=data['name'], email=data['email'],
                               subject=data['subject'], message=data['message'])
            contact.save()
            print(data)
            return Response({'sucesss': 'Message has been sent'})
        except expression as identifier:
            return Response({'errors': 'Message could  not be sent!'})


# Create your views here.
