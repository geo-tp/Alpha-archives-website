from django.db import models

class Image(models.Model):
    image = models.ImageField()

class Hash(models.Model):
    image_hash = models.CharField(max_length=50)

class Hash_Image(models.Model):
    image_path = models.CharField(max_length=300)
    image_hash = models.CharField(max_length=50)

class Element(models.Model):
    name = models.CharField(max_length=100)
    path = models.CharField(max_length=300)
    parent = models.ForeignKey('self',on_delete=models.CASCADE, null=True, blank=True)
    is_file = models.BooleanField()
    image = models.ForeignKey(Image, on_delete=models.CASCADE, null=True, blank=True)
    image_hash = models.ForeignKey(Hash, on_delete=models.CASCADE, null=True, blank=True) 

