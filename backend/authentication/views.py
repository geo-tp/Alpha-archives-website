from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.authtoken.views import ObtainAuthToken
from .serializers import (
    RegisterSerializer,
    PasswordResetSerializer,
    PasswordForgetSerializer,
)
from authentication.models import AuthToken
from rest_framework import status
from django.contrib.auth.password_validation import validate_password
from django.shortcuts import get_object_or_404
from django.core.exceptions import ValidationError
from authentication.emails import (
    send_register_confirmation_email,
    send_password_reset_email,
)
from generic.response import format_api_response
from user.models import CustomUser, UserProfileImage
from generic.models import GenericImage
from .models import EmailValidationToken, PasswordValidationToken
from .messages import (
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    EMAIL_CONFIRMATION_REQUIRED,
    EMAIL_CONFIRMATION_DONE,
    EMAIL_CONFIRMATION_ALREADY_DONE,
    PASSWORD_UPDATE_SUCCESS,
    PASSWORD_RESET_LINK_SENT,
    TOKEN_ALREADY_USED,
    MISC_ERROR,
    ACCOUNT_DEACTIVATED,
)


class LoginView(ObtainAuthToken):

    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        """
        Login user with username/pwd or email/pwd
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]

        if not user.email_validated:
            api_response = format_api_response(
                status=status.HTTP_401_UNAUTHORIZED,
                message=EMAIL_CONFIRMATION_REQUIRED,
                error=True,
            )
            return Response(api_response, status=status.HTTP_401_UNAUTHORIZED)

        if not user.is_active:
            api_response = format_api_response(
                status=status.HTTP_401_UNAUTHORIZED,
                message=ACCOUNT_DEACTIVATED,
                error=True,
            )
            return Response(api_response, status=status.HTTP_401_UNAUTHORIZED)

        token, created = AuthToken.objects.get_or_create(user=user)
        api_response = format_api_response(
            content={"token": token.key}, message=LOGIN_SUCCESS
        )
        return Response(api_response, status=status.HTTP_200_OK)


login_view = LoginView.as_view()


class LogoutView(APIView):

    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        """
        Logout a user by removing its auth token
        """
        request.user.auth_token.delete()

        api_response = format_api_response(message=LOGOUT_SUCCESS)
        return Response(api_response, status=status.HTTP_200_OK)


logout_view = LogoutView.as_view()


class RegisterView(APIView):
    """
    Register a new user
    """

    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

    def get_serializer(self, *args, **kwargs):
        return self.serializer_class(*args, **kwargs)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.save()
        email_token = EmailValidationToken.objects.create(user=user)
        send_register_confirmation_email(user.email, user.username, email_token)

        # User profile image, we create it now with placeholder img
        placeholder_img = GenericImage.objects.create()
        UserProfileImage.objects.create(user=user, image=placeholder_img)

        api_response = format_api_response(
            message=REGISTER_SUCCESS, status=status.HTTP_201_CREATED
        )
        return Response(api_response, status=status.HTTP_201_CREATED)


register_view = RegisterView.as_view()


class EmailValidationView(APIView):
    """
    Validate email with received token
    """

    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):

        key = kwargs.get("key")
        validation_token = get_object_or_404(EmailValidationToken, key=key)

        if validation_token.is_used:
            api_response = format_api_response(
                message=EMAIL_CONFIRMATION_ALREADY_DONE,
                status=status.HTTP_400_BAD_REQUEST,
            )
            return Response(api_response, status=status.HTTP_400_BAD_REQUEST)

        validation_token.user.email_validated = True
        validation_token.is_used = True
        validation_token.save()
        validation_token.user.save()

        api_response = format_api_response(message=EMAIL_CONFIRMATION_DONE)

        return Response(api_response, status=status.HTTP_200_OK)


email_validation_view = EmailValidationView.as_view()


class PasswordForgetView(APIView):
    """
    Send a link to reset password by mail when a correct email address is provided
    """

    serializer_class = PasswordForgetSerializer
    permission_classes = [permissions.AllowAny]

    def get_serializer(self, *args, **kwargs):
        return self.serializer_class(*args, **kwargs)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.data["email"]

        try:
            user = CustomUser.objects.get(email=email)
        except:
            user = None

        if user:
            if user.email_validated:
                (
                    password_token,
                    created,
                ) = PasswordValidationToken.objects.get_or_create(user=user)

                send_password_reset_email(user.email, user.username, password_token)
        api_response = format_api_response(message=PASSWORD_RESET_LINK_SENT)
        return Response(api_response, status=status.HTTP_200_OK)


password_forget_view = PasswordForgetView.as_view()


class PasswordResetView(APIView):
    """
    Reset user password with the one provided (requires password reset token)
    """

    serializer_class = PasswordResetSerializer
    permission_classes = [permissions.AllowAny]

    def get_serializer(self, *args, **kwargs):
        return self.serializer_class(*args, **kwargs)

    def post(self, request, *args, **kwargs):
        key = kwargs.get("key")
        validation_token = get_object_or_404(PasswordValidationToken, key=key)
        user = validation_token.user
        if validation_token.is_used:
            api_response = format_api_response(
                message=TOKEN_ALREADY_USED,
                status=status.HTTP_400_BAD_REQUEST,
                error=True,
            )
            return Response(api_response, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        password = serializer.data["password"]
        user.set_password(password)
        user.save()
        validation_token.is_used = True
        validation_token.save()

        api_response = format_api_response(message=PASSWORD_UPDATE_SUCCESS)
        return Response(api_response, status=status.HTTP_200_OK)


password_reset_view = PasswordResetView.as_view()


class DeactivateAccountView(APIView):
    """
    Deactivate user account, user will be disconnected and not able to connect anymore
    """

    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        auth_token = AuthToken.objects.get(user=user)
        auth_token.delete()
        user.is_active = False
        user.save()

        api_response = format_api_response(message=ACCOUNT_DEACTIVATED)
        return Response(api_response, status=status.HTTP_200_OK)


deactivate_account_view = DeactivateAccountView.as_view()
