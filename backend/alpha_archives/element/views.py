from django.shortcuts import render
from rest_framework import viewsets
from .serializers import *
from .models import *
from rest_framework.response import Response
# from utils.ParserManager import ParserManager
from rest_framework import status
import copy
from alpha_archives.settings import MEDIA_URL
from django.core.exceptions import MultipleObjectsReturned
import imagehash
from PIL import Image as Img
import django_filters
from security.utils import is_hdd_full



class ImageViewSet(viewsets.ModelViewSet):

    queryset = Image.objects.all()
    serializer_class = ImageSerializer


    def generate_image_hash(self, image_path):
        return imagehash.average_hash(Img.open(image_path))

    def create(self, request):

        image = copy.deepcopy(request.data["image"])
        image_hash = self.generate_image_hash(image)

        try:
            Hash_Image.objects.get(image_hash=image_hash)
        except MultipleObjectsReturned:
            pass
        except:
            print(image_hash)
            path= MEDIA_URL + str(request.FILES["image"])
            Hash_Image.objects.create(image_hash=image_hash, image_path=path)
            return  super().create(request)


        return Response({"detail":"Already in Archive"}, 
                        status=status.HTTP_208_ALREADY_REPORTED)


class HashImageViewSet(viewsets.ModelViewSet):

    queryset = Hash_Image.objects.all()
    serializer_class = HashImageSerializer

class ElementViewSet(viewsets.ModelViewSet):

    queryset = Element.objects.all()
    serializer_class = ElementSerializer

    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = ["parent", "image", "name"]

    def create(self, request):

        if is_hdd_full():
            return Response({"error":"HDD is full"}, 
                   status=status.HTTP_403_FORBIDDEN)
        
        return super().create(request)