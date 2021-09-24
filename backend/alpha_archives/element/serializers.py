from rest_framework import serializers
from .models import *

class ImageSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Image
        fields = "__all__"


class HashImageSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Hash_Image
        fields = ['image_path', 'image_hash']

class ElementSerializer(serializers.HyperlinkedModelSerializer):

    image = HashImageSerializer()

    class Meta:
        model = Element
        fields = "__all__"
