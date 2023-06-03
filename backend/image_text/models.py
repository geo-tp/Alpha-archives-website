from django.db import models


class ImageText(models.Model):
    image_hash = models.CharField(max_length=255, primary_key=True)
    combined_content = models.TextField(blank="True", default="")
    easy_ocr_content = models.TextField(blank="True", default="")
    wow_ocr_content = models.TextField(blank="True", default="")
