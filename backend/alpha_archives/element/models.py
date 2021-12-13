from django.db import models

class Image(models.Model):
    image = models.ImageField()

class Hash_Image(models.Model):
    image_path = models.CharField(max_length=2000)
    image_hash = models.CharField(max_length=50)

class Element(models.Model):
    name = models.CharField(max_length=2000)
    thumbnail_path = models.ImageField()
    parent = models.CharField(max_length=2000)
    is_file = models.BooleanField()
    image = models.ForeignKey(Hash_Image, on_delete=models.CASCADE, null=True, blank=True)
