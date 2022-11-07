from django.urls import path
from .views import profile_view, password_view, profile_image_view

urlpatterns = [
    path("profile", profile_view, name="api_user_profile"),
    path("profile/image", profile_image_view, name="api_user_image"),
    path("password", password_view, name="api_user_password"),
]
