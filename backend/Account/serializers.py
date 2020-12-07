from rest_framework import serializers
from .models import Account
from django.contrib.auth import authenticate
from rest_framework import exceptions
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.utils.encoding import smart_str, force_str, smart_bytes, DjangoUnicodeDecodeError
from django.contrib.auth.tokens import PasswordResetTokenGenerator


class LoginSerializers(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(Self, data):
        email = data.get('email', '')
        password = data.get('password', '')
        if email and password:
            # user = authenticate(email=email, password=password)
            user = authenticate(email=email, password=password)

            if user:
                if user.is_active:
                    data['user'] = user
                    data['tokens'] = user.tokens()
                else:
                    msg = 'The User has been deactivated, Please Conatact with admin'
                    exceptions.ValodationError(msg)
            else:
                msg = 'There is no User with this login and password'
                exceptions.ValidationError(msg)
        else:
            msg = 'There is no User with this login and password'
            exceptions.ValodationError(msg)

        return data


class RegisterSerializers(serializers.Serializer):
    email = serializers.EmailField()
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get('email', '')
        username = data.get('username', '')
        password = data.get('password', '')

        if Account.objects.filter(email=email).first():
            raise serializers.ValidationError(
                'This eamil is exists, please chanhge it ')
        if Account.objects.filter(username=username).first():
            raise serializers.ValidationError(
                ' The username is already token, please chosese  another uśername Fuck Trump!')

        return data

    def create(self, validated_data):
        return Account.objects.create_user(email=validated_data['email'], username=validated_data['username'], password=validated_data['password'])


class logoutSerializer(serializers.Serializer):
    pass


class commingEmailVerifySerializer(serializers.Serializer):
    token = serializers.CharField(max_length=550)

    class Meta:
        fields = ['token']


class passwordResetEmailSerializers(serializers.Serializer):
    email = serializers.EmailField()

    class Meta:
        fields = ['email']


class setNewPasswordSerializer(serializers.Serializer):
    token = serializers.CharField()
    uidb64 = serializers.CharField()
    password = serializers.CharField(write_only=True)

    class Meta:
        fields = ['token', 'uidb64', 'password']

    def validate(self, attrs):
        try:
            uidb64 = attrs.get('uidb64', '')
            password = attrs.get('password', '')
            token = attrs.get('token')
            user_id = force_str(urlsafe_base64_decode(uidb64))
            user = Account.objects.get(id=user_id)
            if not PasswordResetTokenGenerator().check_token(user, token):
                raise AuthorizationFailded(
                    'Token is not valid please order new One Fuck Trump', 401)

            user.set_password(password)
            user.save()
            return user
        except DjangoUnicodeDecodeError:
            raise AuthorizationFailded(
                'Token is not valid please order new One Fuck Trump', 401)
        return super().validate(attrs)
