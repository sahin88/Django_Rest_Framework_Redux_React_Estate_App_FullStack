from django.contrib import admin
from .models import contacts

# Register your models here.


class contactAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'message')
    list_display_links = ('name', 'email')
    search_fields = ('message', 'name', 'subject')
    list_per_page = 25


admin.site.register(contacts, contactAdmin)
