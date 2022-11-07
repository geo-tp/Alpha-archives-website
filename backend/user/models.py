from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from .managers import CustomUserManager
from main import settings


class CustomUser(AbstractUser):
    """
    Default user model
    """

    username = models.CharField(max_length=50, unique=True, blank=True)

    birthdate = models.DateField(blank=True, null=True)

    street_number = models.CharField(max_length=20, blank=True)
    street_type = models.CharField(max_length=50, blank=True)
    street_name = models.CharField(max_length=200, blank=True)
    city_zipcode = models.CharField(max_length=20, blank=True)
    city = models.CharField(max_length=200, blank=True)
    address_complement = models.CharField(max_length=500, blank=True)
    country = models.CharField(max_length=200, blank=True, default="France")

    email = models.EmailField(_("email address"), unique=True)
    email_validated = models.BooleanField(default=False)

    phone_number = models.CharField(max_length=15, blank=True)
    phone_validated = models.BooleanField(default=False)

    objects = CustomUserManager()

    def __str__(self):
        return self.username


class UserProfileImage(models.Model):
    image = models.ForeignKey("generic.GenericImage", on_delete=models.CASCADE)
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        related_name="profile_image",
        on_delete=models.CASCADE,
        verbose_name=_("User"),
    )


# class UserImage(models.Model):

#     image = models.ImageField(
#         verbose_name="user image large", default="default-user.webp"
#     )

#     image_thumbnail = models.ImageField(
#         verbose_name="user image thumbnail", default="default-user.webp"
#     )

#     user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

#     def save(self, *args, **kwargs):
#         """
#         Compress image and create thumbnail
#         """
#         if not self.image.readable():
#             return

#         # open the file as PIL image
#         image = Image.open(self.image)

#         # set up an in-memory byte io interfaces for image/image_thumbnail
#         image_io = BytesIO()
#         image_io2 = BytesIO()

#         # compress img
#         image_compressed = image.save(image_io, image.format, quality=60, optimize=True)
#         self.image = File(image_io, name=self.image.name)

#         # get width
#         img_width, _ = image.size

#         # checking the width
#         default_thumbnail_width = 200
#         if img_width > default_thumbnail_width:
#             # create the thumbnail
#             image.thumbnail(
#                 (default_thumbnail_width, default_thumbnail_width),
#                 Image.LANCZOS,
#             )

#         # save the results to the in-memory file
#         image.save(image_io2, image.format, quality=60, optimize=True)
#         # change content to the new file
#         self.image_thumbnail = File(image_io2, name=self.image.name)

#         return super().save(*args, **kwargs)
