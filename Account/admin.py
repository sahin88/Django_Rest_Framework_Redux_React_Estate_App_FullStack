from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import Account


class AdminUserModel(BaseUserAdmin):
    class Meta:
        model = Account
    list_display = ('email', 'email', 'username', 'date_joined', 'last_login',
                    'is_admin')
    list_filter = ()
    fieldsets = (
        (None, {
            'fields': ('email', 'password')
        }),
        ('Personal info', {
            'fields': ('last_login', )
        }),
        ('Permissions', {
            'fields':
            ('username', 'is_admin', 'is_active',
             'is_staff', 'is_superuser', 'is_verified')
        }),
    )
    # add_fieldsets is not a standard ModelAdmin attribute. UserAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    add_fieldsets = ((None, {
        'classes': ('wide', ),
        'fields': ('email', 'password')
    }), )
    search_fields = ('email', )
    ordering = ('email', )
    filter_horizontal = ()


admin.site.register(Account, AdminUserModel)

# Register your models here.
