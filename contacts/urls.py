from django.urls import path
from .views import contactCreateandMailSend

urlpatterns = [
    path('mail/', contactCreateandMailSend.as_view(), name="contact_mail")
]
