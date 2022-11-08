import binascii
import os

from django.db import models
from django.utils.translation import gettext_lazy as _
from user.models import CustomUser
from main import settings


class AbstractCustomToken(models.Model):
    """
    The default abstract token model
    """

    key = models.CharField(_("Key"), max_length=40, primary_key=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    created = models.DateTimeField(_("Created"), auto_now_add=True)

    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        if not self.key:
            self.key = self.generate_key()
        return super(AbstractCustomToken, self).save(*args, **kwargs)

    def generate_key(self):
        return binascii.hexlify(os.urandom(20)).decode()

    def __str__(self):
        return self.key


class AuthToken(AbstractCustomToken):
    """
    Token for authenticate user, the one returned when succesfull login
    """

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        related_name="auth_token",
        on_delete=models.CASCADE,
        verbose_name=_("User"),
    )


class EmailValidationToken(AbstractCustomToken):
    """
    Token sended to user email during user registration process
    """

    is_used = models.BooleanField(default=False)


class PasswordValidationToken(AbstractCustomToken):
    """
    Token sended to user email during password reset process
    """

    is_used = models.BooleanField(default=False)
