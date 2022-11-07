from django.db import models


class File(models.Model):
    parent = models.CharField(max_length=1024)
    filename = models.CharField(max_length=1024)
    is_folder = models.BooleanField(default=False)

    # we use a CharField here to be able to build database from archives without deal with File
    image_raw = models.CharField(max_length=1024, blank=True, null=True)

    image_thumbnail = models.ImageField(blank=True, null=True)
    image_hash = models.CharField(max_length=256, blank=True, null=True)
