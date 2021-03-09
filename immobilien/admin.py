from django.contrib import admin
from .models import immobilien


class immobilienAdmin(admin.ModelAdmin):

    list_display = ('id', 'name', 'date_joined', 'topseller')
    list_display_links = ('id', 'name')
    search_fields = ('name',)
    list_per_page = 24


admin.site.register(immobilien, immobilienAdmin)

# Register your models here.
