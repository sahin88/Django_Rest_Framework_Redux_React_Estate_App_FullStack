from django.shortcuts import render
from django.contrib.auth import login as django_login, logout as django_logout
from .models import Account
from .serializers import LoginSerializers, RegisterSerializers, commingEmailVerifySerializer, logoutSerializer, passwordResetEmailSerializers, passwordResetEmailSerializers, setNewPasswordSerializer
from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from django.contrib.sites.shortcuts import get_current_site
from rest_framework_simplejwt.tokens import RefreshToken
from django.urls import reverse
from django.conf import settings
import jwt
from .utils import Util
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.utils.encoding import smart_str, force_str, smart_bytes, DjangoUnicodeDecodeError
from django.contrib.auth.tokens import PasswordResetTokenGenerator


class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializers

    def post(self, request):
        serializer = LoginSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        django_login(request, user)
        return Response({'Sucess': 'The user  has been logged in  sucessfully ', 'tokens': serializer.validated_data['tokens']})


class RegistrationView(generics.GenericAPIView):
    serializer_class = RegisterSerializers

    def post(self, request):
        password1 = self.request.data['password']
        password2 = self.request.data['password2']
        if password1 != password2:
            raise Response('paswords dont match with each other ')
        request.data.pop('password2')
        serializer = RegisterSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            user = Account.objects.get(email=serializer.data['email'])
            token = RefreshToken.for_user(user).access_token
            current_site = get_current_site(request).domain
            relativeLink = reverse('register-email-verify')

            abslurl = 'http://'+current_site+relativeLink+'?token='+str(token)

            email_body = 'Hi'+user.username + \
                'Please verify your account via provided link ' + '\n' + abslurl
            data = {'email_body': email_body,
                    'subject': 'Verify your email adress', 'to_email': user.email}
            Util.send_email(data)

            return Response({'Sucess': 'The User  has been sucessfully registired'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': serializer.errors},
                            status=status.HTTP_400_BAD_REQUEST)


class LogoutView(generics.GenericAPIView):
    serializer_class = logoutSerializer

    def post(self, request):
        django_logout(request)
        return Response({'sucess': 'User  has been sucessfully logged out!'}, status=status.HTTP_200_OK)


class commingEmailVerify(generics.GenericAPIView):
    serializer_class = commingEmailVerifySerializer

    def get(self, request):
        token = request.GET.get('token')
        paylooad = jwt.decode(token, settings.SECRET_KEY)
        user = Account.objects.get(id=paylooad['user_id'])
        try:
            payload = jwt.decode(token, settings.SECRET_KEY)
            user = Account.objects.get(id=payload['user_id'])
            user.is_verified = True
            user.save()
            return Response('data: you  have been succesfully verified', status=status.HTTP_200_OK)
        except jwt.ExpiredSignatureError as identifer:
            Response('error: Activation has not been done',
                     status=status.HTTP_400_BAD_REQUEST)
        except jwt.exceptions.DecodeError as identifer:
            Response('error: Activation has not been done',
                     status=status.HTTP_400_BAD_REQUEST)


class forgotPasswordEmailRequest(generics.GenericAPIView):
    serializer_class = passwordResetEmailSerializers

    def post(self, request):
        email = self.request.data['email']
        try:
            user_item = Account.objects.filter(email=email)
            print('e,ail', user_item)
        except Exception as error:
            return Response({'error': error})
        if user_item.exists():
            user = Account.objects.get(email=email)
            uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)
            current_site = get_current_site(request=request).domain
            relativeLink = reverse(
                'forget-email-verify', kwargs={'token': token, 'uidb64': uidb64})
            abslurl = 'http://'+current_site+relativeLink
            print('abslurl', abslurl)
            email_body = 'Hi'+user.username + \
                'Please verify your account via provided link' + abslurl
            data = {'email_body': email_body,
                    'subject': 'Verify your email adress', 'to_email': user.email}
            Util.send_email(data)
        return Response('Status: EMail  has been sucessfully send to  user', status=status.HTTP_200_OK)


class forgotPasswordEmailVerify(generics.GenericAPIView):

    def get(self, request, uidb64, token):
        try:
            user_id = smart_str(urlsafe_base64_decode(uidb64))
            user = Account.objects.get(id=user_id)
            if not PasswordResetTokenGenerator().check_token(user, token):
                return Response('Token is not valid please order new One', status=status.HTTP_401_UNAUTHORIZED)
            return Response({'Sucess': True, 'message': 'Crendential is ok', 'token': token, 'uidb64': uidb64})
        except DjangoUnicodeDecodeError as identifier:
            Response({'errors': identifer})


class setNewPassword(generics.GenericAPIView):
    serializer_class = setNewPasswordSerializer

    def patch(self, request):
        serializer = self.serializer_class(data=self.request.data)
        serializer.is_valid(raise_exception=True)
        return Response({'Sucess': True, 'message': 'Password has been sucessfully changed'},
                        status=status.HTTP_200_OK)
