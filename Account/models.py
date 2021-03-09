from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.utils import timezone
import datetime
from rest_framework_simplejwt.tokens import RefreshToken
# 103


class MyAccountManager(BaseUserManager):
    def create_user(self,
                    email,
                    username,
                    password=None,
                    is_active=True,
                    is_admin=False,
                    is_staff=False,
                    is_superuser=False,
                    is_verified=False):
        if username is None:
            raise ValueError('Username field is necessary please fill out')
        if email is None:
            raise ValueError('Fuck Trump Erdogan Putin and their voters')
        user = self.model(email=self.normalize_email(email), username=username)
        user.set_password(password)
        user.is_admin = is_admin
        user.is_active = is_active
        user.is_staff = is_staff
        user.is_verified = is_verified
        user.is_superuser = is_superuser
        user.save(using=self._db)
        return user

    def create_superuser(self,
                         email,
                         username,
                         password):
        user = self.create_user(email=self.normalize_email(
            email), username=username, password=password, is_active=True, is_admin=True, is_staff=True, is_superuser=True, is_verified=False)
        user.is_active = True
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.is_verified = False
        print('haci hüsrev')

        return user


class Account(AbstractBaseUser):
    email = models.EmailField(max_length=60, name='email', unique=True)
    username = models.CharField(max_length=30, unique=True)
    date_joined = models.DateTimeField(
        verbose_name='date_time_joined', default=timezone.now)
    last_login = (models.DateTimeField(
        verbose_name='last_login', default=timezone.now))
    is_active = models.BooleanField(default=True)
    is_verified = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    objects = MyAccountManager()

    def __str__(self):
        return self.email

    def has_perm(self, perms, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True

    def tokens(self):
        refresh = RefreshToken.for_user(self)
        return{'refresh': str(refresh), 'token': str(refresh.access_token)}
