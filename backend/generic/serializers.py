from rest_framework import serializers
from generic.models import GenericImage


class GenericImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = GenericImage
        fields = ["image", "image_thumbnail"]
