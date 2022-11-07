from django.db import models
from user.models import CustomUser


class Tag(models.Model):
    name = models.CharField(max_length=255, primary_key=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)


class AppliedTag(models.Model):
    tag = models.ForeignKey(
        Tag,
        on_delete=models.CASCADE,
    )
    file_hash = models.CharField(max_length=256)
