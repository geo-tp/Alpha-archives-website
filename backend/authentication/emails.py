from django.utils.html import strip_tags
from django.template.loader import render_to_string
from django.core.mail import send_mail
from main.settings import (
    EMAIL_VALIDATION_URL,
    PASSWORD_RESET_URL,
    DEFAULT_FROM_EMAIL,
    APP_NAME,
)
from sys import path

# Path containing email templates
TEMPLATES_PATH = path[0] + "/authentication/templates/"


def send_register_confirmation_email(email, username, token):

    confirmation_link = f"{EMAIL_VALIDATION_URL}{token}"

    html_template = TEMPLATES_PATH + "register_email.html"
    html_message = render_to_string(
        html_template,
        {
            "username": username,
            "confirmation_link": confirmation_link,
            "app_name": APP_NAME,
        },
    )
    plain_message = strip_tags(html_message)

    send_mail(
        f"{APP_NAME} - Thanks for your registration {username}",
        plain_message,
        DEFAULT_FROM_EMAIL,
        [email],
        html_message=html_message,
    )


def send_password_reset_email(email, username, token):

    reset_link = f"{PASSWORD_RESET_URL}{token}"

    html_template = TEMPLATES_PATH + "password_reset_email.html"
    html_message = render_to_string(
        html_template,
        {"username": username, "reset_link": reset_link, "app_name": APP_NAME},
    )
    plain_message = strip_tags(html_message)

    send_mail(
        f"{APP_NAME} - Your requested a password reset {username}",
        plain_message,
        DEFAULT_FROM_EMAIL,
        [email],
        html_message=html_message,
    )
