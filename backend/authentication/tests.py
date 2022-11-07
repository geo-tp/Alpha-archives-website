from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from user.models import CustomUser, UserProfileImage
from generic.models import GenericImage
from generic.tests import APITestCaseWithUser
from authentication.models import (
    EmailValidationToken,
    AuthToken,
    PasswordValidationToken,
)


class AuthenticationTests(APITestCaseWithUser):
    """
    Tests for each Authentication view
    """

    def test_register(self):
        """
        Ensure we can create a new account and receive an email to finalise registration.
        """
        url = reverse("api_register")
        data = {
            "username": "RegisterExample",
            "email": "email_example@mail.com",
            "password": "ARandomPassword",
        }
        response = self.client.post(url, data, format="json")
        user = CustomUser.objects.get(email=data["email"])

        self.assertIsNotNone(EmailValidationToken.objects.get(user=user))
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(
            user.username,
            data["username"],
        )

    def test_email_validation(self):
        """
        Ensure we can confirm email with received token
        """

        url = reverse(
            "api_email_validation", kwargs={"key": self.email_validation_token}
        )
        response = self.client.get(url, format="json")
        user = CustomUser.objects.get(email=self.email)
        email_token = EmailValidationToken.objects.get(key=self.email_validation_token)

        self.assertEqual(email_token.is_used, 1)
        self.assertEqual(user.email_validated, 1)

    def test_login(self):
        """
        Ensure we can login with credentials and obtain a auth token
        """
        url = reverse("api_login")

        data = {"username": self.email, "password": self.password}
        response = self.client.post(
            url,
            data,
            format="json",
        )
        user = CustomUser.objects.get(email=self.email)
        response_token = response.data["body"]["token"]
        user_token = AuthToken.objects.get(user=user).key

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response_token, user_token)

    def test_password_forget(self):
        """
        Ensure we can request and receive a reset password token
        """

        url = reverse("api_password_forget")
        data = {"email": self.email}
        response = self.client.post(url, data, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_password_reset(self):
        """
        Ensure we can reset password with received token
        """

        url = reverse("api_password_reset", kwargs={"key": self.password_reset_token})
        data = {"password": "TestingTesting"}

        response = self.client.post(url, data, format="json")
        password_reset_instance = PasswordValidationToken.objects.get(
            key=self.password_reset_token
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(password_reset_instance.is_used, 1)

    def test_logout(self):
        """
        Ensure we can logout and remove user auth token
        """

        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.auth_token)
        url = reverse("api_logout")
        response = self.client.post(
            url,
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(AuthToken.objects.count(), 0)

    def test_deactivate_account(self):
        """
        Ensure we can deactivate account and not be able to connect anymore
        """

        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.auth_token)
        deactivate_url = reverse("api_deactivate_account")
        deactivate_response = self.client.post(deactivate_url, format="json")

        self.client.credentials(HTTP_AUTHORIZATION="")
        data = {"username": self.email, "password": self.password}
        login_url = reverse("api_login")
        login_response = self.client.post(
            login_url,
            data,
            format="json",
        )

        # Deactivate response
        self.assertEqual(deactivate_response.status_code, status.HTTP_200_OK)
        self.assertEqual(AuthToken.objects.count(), 0)

        # Login response
        self.assertEqual(login_response.status_code, status.HTTP_400_BAD_REQUEST)
