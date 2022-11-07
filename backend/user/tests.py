from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from user.models import CustomUser, UserProfileImage
from authentication.models import (
    EmailValidationToken,
    AuthToken,
    PasswordValidationToken,
)
from generic.models import GenericImage
from generic.tests import APITestCaseWithUser


class UserTests(APITestCaseWithUser):
    """
    Tests for each User view
    """

    def test_profile_update(self):
        """
        Ensure we can update user profile
        """

        url = reverse("api_user_profile")
        data = {
            "first_name": "John",
            "last_name": "Doe",
            "city": "Paris",
            "city_zipcode": "75000",
            "street_type": "rue",
            "street name": "de la mairie",
            "steet_number": "10",
            "birthdate": "1995-10-10",
            "phone_number": "0606060606",
        }
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.auth_token)
        response = self.client.patch(url, data, format="json")
        user = CustomUser.objects.get(email=self.email)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(data["first_name"], user.first_name)

    def test_profile_read(self):
        """
        Ensure we can get the user profile
        """

        url = reverse("api_user_profile")
        user = CustomUser.objects.get(email=self.email)
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.auth_token)
        response = self.client.get(url, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["body"]["first_name"], user.first_name)

    def test_password_update(self):
        """
        Ensure we can update user password
        """

        url = reverse("api_user_password")
        new_password = "ANewPasswordHere"
        data = {"old_password": self.password, "new_password": new_password}
        user = CustomUser.objects.get(email=self.email)
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.auth_token)
        response = self.client.put(url, data, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
