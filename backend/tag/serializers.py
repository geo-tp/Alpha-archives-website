from rest_framework import serializers
from tag.models import Tag, AppliedTag


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ["name", "user"]


class AppliedTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppliedTag
        fields = "__all__"


class SearchFilesByTagsSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=255)
