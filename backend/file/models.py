from django.db import models


class File(models.Model):
    parent = models.CharField(max_length=1024)
    filename = models.CharField(max_length=1024)
    is_folder = models.BooleanField(default=False)

    image_raw = models.ImageField(blank=True, null=True, max_length=4096)

    image_thumbnail = models.ImageField(blank=True, null=True)
    image_hash = models.CharField(max_length=256, blank=True, null=True)
