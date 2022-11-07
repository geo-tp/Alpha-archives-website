from django.db import models
from user.models import CustomUser
from io import BytesIO
import sys
from PIL import Image
from django.core.files import File
from main.settings import (
    IMAGE_COMPRESSION_LEVEL,
    IMAGE_MAX_WIDTH,
    IMAGE_THUMBNAIL_WIDTH,
)


class GenericImage(models.Model):
    """
    Generic image model with auto compression/resizing and thumbnail generation
    """

    image = models.ImageField(verbose_name="image large", default="default-user.webp")

    image_thumbnail = models.ImageField(
        verbose_name="image thumbnail", default="default-user.webp"
    )

    def save(self, *args, **kwargs):

        if not self.image.readable():
            return super().save(*args, **kwargs)

        # open the file as PIL image
        image = Image.open(self.image)

        # set up an in-memory byte io interfaces for image and thumbnail
        image_io = BytesIO()
        thumbnail_io = BytesIO()

        image_width, image_height = image.size

        if image_width > IMAGE_MAX_WIDTH:
            w_ratio = image_width / IMAGE_MAX_WIDTH
            h_ratio = image_height / desired_width
            final_height = int(desired_width * h_ratio / w_ratio)

            image.thumbnail((desired_width * final_height))

        image_compressed = image.save(image_io, image.format, quality=60, optimize=True)
        self.image = File(image_io, name=self.image.name)

        # checking the width
        if image_width > IMAGE_THUMBNAIL_WIDTH:
            # create the thumbnail
            image.thumbnail(
                (IMAGE_THUMBNAIL_WIDTH, IMAGE_THUMBNAIL_WIDTH),
                Image.LANCZOS,
            )

        # save the results to the in-memory file
        image.save(thumbnail_io, image.format, quality=60, optimize=True)
        # change content to the new file
        self.image_thumbnail = File(thumbnail_io, name=self.image.name)

        return super().save(*args, **kwargs)
