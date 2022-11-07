from django.contrib import admin
from .models import EmailValidationToken, PasswordValidationToken

admin.site.register(EmailValidationToken)
admin.site.register(PasswordValidationToken)
