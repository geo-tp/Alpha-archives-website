from django.shortcuts import render
from rest_framework import viewsets
from .serializers import *
from .models import *
from rest_framework.response import Response
from FingerprintManager import FingerprintManager
from rest_framework import status
import copy
from alpha_archives.settings import MEDIA_URL

class ImageViewSet(viewsets.ModelViewSet):

    queryset = Image.objects.all()
    serializer_class = ImageSerializer
    fpm = FingerprintManager()

    def create(self, request):

        image = copy.deepcopy(request.data["image"])
        image_hash = self.fpm.create_image_hash(image)

        try:
            hash_img = Hash_Image.objects.get(image_hash=image_hash)
            return Response({"detail":"Already in Archive",
                             "path": hash_img.image_path}, 
                            status=status.HTTP_208_ALREADY_REPORTED)
        except:
            path= MEDIA_URL + str(request.FILES["image"])
            Hash_Image.objects.create(image_hash=image_hash, image_path=path)
            return  super().create(request)




class HashViewSet(viewsets.ModelViewSet):

    queryset = Hash.objects.all()
    serializer_class = HashSerializer

class HashImageViewSet(viewsets.ModelViewSet):

    queryset = Hash_Image.objects.all()
    serializer_class = HashImageSerializer

class ElementViewSet(viewsets.ModelViewSet):

    queryset = Element.objects.all()
    serializer_class = ElementSerializer