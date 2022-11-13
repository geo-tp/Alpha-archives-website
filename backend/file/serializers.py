from rest_framework import serializers
from file.models import File
from tag.serializers import AppliedTagSerializer
from tag.models import AppliedTag
from main.settings import MEDIA_HOST_URL


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = "__all__"

    def to_representation(self, instance):
        response = super().to_representation(instance)
        tags = AppliedTag.objects.filter(file_hash=response["image_hash"])
        serializer = AppliedTagSerializer(tags, many=True)
        response["tags"] = serializer.data

        image_raw = response["image_raw"]
        if image_raw:
            response["image_raw"] = MEDIA_HOST_URL + image_raw
            response["image_thumbnail"] = MEDIA_HOST_URL + image_raw

        return response


class UploadFileSerializer(serializers.Serializer):
    image = serializers.ImageField(required=True)
