from django.urls import path
from .views import (
    login_view,
    logout_view,
    register_view,
    email_validation_view,
    password_forget_view,
    password_reset_view,
    deactivate_account_view,
)

urlpatterns = [
    path("login", login_view, name="api_login"),
    path("logout", logout_view, name="api_logout"),
    path("register", register_view, name="api_register"),
    path("email-validation/<key>", email_validation_view, name="api_email_validation"),
    path("password-forget", password_forget_view, name="api_password_forget"),
    path("password-reset/<key>", password_reset_view, name="api_password_reset"),
    path("deactivate-account", deactivate_account_view, name="api_deactivate_account"),
]
