from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from rest_framework import serializers
from user.models import CustomUser
from .models import EmailValidationToken


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            "username",
            "email",
            "password",
        ]
        extra_kwargs = {"password": {"write_only": True}}

    def validate_password(self, value):
        validate_password(value, CustomUser)
        return value

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            validated_data["email"],
            validated_data["username"],
            validated_data["password"],
        )

        return user


class PasswordForgetSerializer(serializers.Serializer):
    email = serializers.EmailField()


class PasswordResetSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=128)

    def validate_password(self, value):
        validate_password(value, CustomUser)
        return value
