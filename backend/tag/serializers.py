from rest_framework import serializers
from tag.models import Tag, AppliedTag


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ["name", "user"]
        read_only_fields = ["user"]


class AppliedTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppliedTag
        fields = "__all__"


class CustomAppliedTagSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=255)
