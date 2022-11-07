from rest_framework import serializers
from file.models import File
from tag.serializers import AppliedTagSerializer
from tag.models import AppliedTag


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = "__all__"

    def to_representation(self, instance):
        response = super().to_representation(instance)
        tags = AppliedTag.objects.filter(file_hash=response["image_hash"])
        serializer = AppliedTagSerializer(tags, many=True)
        response["tags"] = serializer.data

        return response


class UploadFileSerializer(serializers.Serializer):
    image = serializers.ImageField(required=True)
