from django.urls import path
from .views import contactCreateandMailSend

urlpatterns = [
    path('', contactCreateandMailSend.as_view())
]
