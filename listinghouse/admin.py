from django.contrib import admin
from .models import Listings


class ListingsAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'is_published',
                    'list_date', 'price', 'imobile')
    list_display_links = ('id', 'title')
    list_filter = ('imobile',)
    list_editable = ('is_published',)
    search_fields = ('title', 'city', 'state', 'zipcode', 'adress')
    list_per_page = 25


admin.site.register(Listings, ListingsAdmin)

# Register your models here.
