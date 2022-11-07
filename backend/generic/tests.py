# from django.test import TestCase
# from django.urls import reverse
# from rest_framework import status
from rest_framework.test import APITestCase
from user.models import CustomUser, UserProfileImage
from generic.models import GenericImage

from authentication.models import (
    EmailValidationToken,
    AuthToken,
    PasswordValidationToken,
)


class APITestCaseWithUser(APITestCase):
    """
    Add user support for APITestCase
    """

    username = "Testing"
    email = "testingApp@mail.com"
    password = "TestingTesting"
    auth_token = "auth69875ecdaa628405940f83a3ba6f3a466718"
    email_validation_token = "email9875ecdaa628405940f83a3ba6f3a466718"
    password_reset_token = "password5ecdaa628405940f83a3ba6f3a466718"

    @classmethod
    def setUpClass(cls):
        """
        Set up database BEFORE FIRST test
        """
        user = CustomUser.objects.create_user(
            username=cls.username,
            email=cls.email,
            password=cls.password,
            email_validated=True,
        )

        # create user profile image with a placeholder
        placeholder_image = GenericImage.objects.create()
        UserProfileImage.objects.create(image=placeholder_image, user=user)

        # tokens
        AuthToken.objects.create(user=user, key=cls.auth_token)
        EmailValidationToken.objects.create(user=user, key=cls.email_validation_token)
        PasswordValidationToken.objects.create(user=user, key=cls.password_reset_token)

        super().setUpClass()

    @classmethod
    def tearDownClass(cls):
        """
        Remove all created records AFTER LAST test
        """
        super().tearDownClass()

        AuthToken.objects.all().delete()
        CustomUser.objects.all().delete()
        UserProfileImage.objects.all().delete()
        PasswordValidationToken.objects.all().delete()
