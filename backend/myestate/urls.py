"""myestate URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from immobilien import urls as immobilien_urls
from listinghouse import urls as lingshouse_urls
from Account import urls as Account_urls
from contacts import urls as contacts_urls
from django.conf.urls.static import static
from django.conf import settings
from django.views.generic import TemplateView

schema_view = get_schema_view(
    openapi.Info(
        title="Estate API",
        default_version='v1',
        description="Test description",
        terms_of_service="https://www.auxapp.com/policies/terms/",
        contact=openapi.Contact(email="contact@snippets.local"),
        license=openapi.License(name="My License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

# reset-email-verify  backend/immobilien
urlpatterns = [
    # path('', TemplateView.as_view(template_name='index.html')),
    path('admin/', admin.site.urls),
    path('account/', include(Account_urls)),
    path('immobilien/', include(immobilien_urls)),
    path('listinghouse/', include(lingshouse_urls)),
    path('contact/', include(contacts_urls)),

    path('', schema_view.with_ui('swagger', cache_timeout=0),
         name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc',
                                       cache_timeout=0), name='schema-redoc')

]
# urlpatterns += [re_path('',
#                         TemplateView.as_view(template_name='index.html'))]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


#  path('login/', LoginView.as_view(), name='login'),
#     path('register/', RegistrationView.as_view(), name='register'),
#     path('logout/', LogoutView.as_view(), name='logout'),
#     path('register-email-verify/', commingEmailVerify.as_view(),
#          name='register-email-verify'),
#     path('forget-email-send/', forgotPasswordEmailRequest.as_view(),
#          name='forget-email-send'),
#     path('forget-email-verify/<token>/<uidb64>/',
#          forgotPasswordEmailVerify.as_view(), name='forget-email-verify'),
#     path('forget-email-reset/', setNewPassword.as_view(),
#          name='forget-email-reset'),
