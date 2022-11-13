from rest_framework import serializers
from tag.models import Tag, AppliedTag
from main.settings import FORBIDDEN_CHAR


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ["name", "user"]
        read_only_fields = ["user"]

    def validate_name(self, value):

        validated_value = ""
        for char in value:
            if char in FORBIDDEN_CHAR:
                continue
            validated_value += char

        tag_exists = Tag.objects.filter(name=validated_value).exists()
        if tag_exists:
            raise serializers.ValidationError(
                {"detail": "Tag already exists with this name"}
            )

        return validated_value


class AppliedTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppliedTag
        fields = ["tag", "file_hash"]

    def validate(self, attrs):

        file_hash = attrs["file_hash"]
        tag_name = attrs["tag"]

        applied_tag_exists = AppliedTag.objects.filter(
            file_hash=file_hash, tag=tag_name
        ).exists()
        if applied_tag_exists:
            raise serializers.ValidationError(
                {"detail": "Tag already applied on this file"}
            )

        return attrs


class CustomAppliedTagSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=255)
