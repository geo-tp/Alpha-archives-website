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
from rest_framework import filters
from security.utils import is_hdd_full
import random
from rest_framework.decorators import action




class ImageViewSet(viewsets.ModelViewSet):

    queryset = Image.objects.all()
    serializer_class = ImageSerializer

    def generate_image_hash(self, image_path):
        return imagehash.average_hash(Img.open(image_path))

    def create(self, request):

        error = False

        try:
            image = copy.deepcopy(request.data["image"])
            image_hash = self.generate_image_hash(image)

            try:
                Hash_Image.objects.get(image_hash=image_hash)
            except MultipleObjectsReturned:
                pass
            except:
                path= MEDIA_URL + str(request.FILES["image"])
                Hash_Image.objects.create(image_hash=image_hash, image_path=path)
                return  super().create(request)
        except:
            error = True


        return Response({"detail":"Already in Archive"}, 
                        status=status.HTTP_208_ALREADY_REPORTED)


class HashImageViewSet(viewsets.ModelViewSet):

    queryset = Hash_Image.objects.all()
    serializer_class = HashImageSerializer

class ElementViewSet(viewsets.ModelViewSet):

    queryset = Element.objects.all()
    serializer_class = ElementSerializer

    filter_backends = [django_filters.rest_framework.DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ["parent", "image", "name"]

    def create(self, request):

        if is_hdd_full():
            return Response({"error":"HDD is full"}, 
                   status=status.HTTP_403_FORBIDDEN)
        
        return super().create(request)

    @action(methods=['get'], detail=False)
    def random(self, request, *args, **kwargs):
        first_element_id = int(Element.objects.first().id)
        last_element_id = int(Element.objects.last().id)

        random_num = random.randrange(first_element_id, last_element_id)
        random_element = Element.objects.get(id=random_num)

        while(not random_element.is_file):
            print("in boucle")
            random_num = random.randrange(first_element_id, last_element_id)
            random_element = Element.objects.get(id=random_num)


        serializer = self.get_serializer(random_element)
        
        random_num -= first_element_id if first_element_id != 1 else 0
        total_num = last_element_id - (first_element_id if first_element_id != 1 else 0)
        data = {"random_number": random_num, "total_number": total_num} 
        data.update(serializer.data)

        return Response(status=status.HTTP_200_OK, data=data)


