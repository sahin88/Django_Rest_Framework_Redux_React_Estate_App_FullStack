
from Account.views import LoginView, RegistrationView, LogoutView, commingEmailVerify, forgotPasswordEmailRequest, forgotPasswordEmailVerify, setNewPassword
from django.urls import path, include

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('register/', RegistrationView.as_view(), name='register'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('register-email-verify/', commingEmailVerify.as_view(),
         name='register-email-verify'),
    path('forget-email-send/', forgotPasswordEmailRequest.as_view(),
         name='forget-email-send'),
    path('forget-email-verify/<token>/<uidb64>/',
         forgotPasswordEmailVerify.as_view(), name='forget-email-verify'),
    path('forget-email-reset/', setNewPassword.as_view(),
         name='forget-email-reset'),
]
