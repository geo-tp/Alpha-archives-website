from rest_framework import serializers
from .models import ImageText


class ImageTextSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageText
        fields = ["image_hash", "wow_ocr_content", "easy_ocr_content"]
