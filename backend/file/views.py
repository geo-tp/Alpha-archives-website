import imagehash
from PIL import Image as Img
from copy import deepcopy
from django.shortcuts import render
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
import django_filters.rest_framework
from rest_framework import viewsets
from rest_framework import permissions
from file.models import File
from file.serializers import FileSerializer, UploadFileSerializer
from rest_framework.response import Response
from rest_framework import status
from main.settings import INCOMING_ROOT, INCOMING_URL
from generic.response import format_api_response
from file.messages import ALREADY_IN_ARCHIVE, UPLOAD_SUCCESS
from rest_framework import filters


class FileViewSet(viewsets.ModelViewSet):

    queryset = File.objects.all()
    serializer_class = FileSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [
        filters.SearchFilter,
        django_filters.rest_framework.DjangoFilterBackend,
    ]
    search_fields = ["parent", "filename"]

    def get_serializer(self, *args, **kwargs):
        if self.action == "create":
            return UploadFileSerializer(*args, **kwargs)
        else:
            return FileSerializer(*args, **kwargs)

    def generate_image_hash(self, image_path):
        return imagehash.average_hash(Img.open(image_path))

    def create(self, request):

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        image = request.FILES["image"]
        image_hash = self.generate_image_hash(image)

        if File.objects.filter(image_hash=image_hash).count():
            api_response = format_api_response(
                status=status.HTTP_208_ALREADY_REPORTED,
                message=ALREADY_IN_ARCHIVE,
                error=True,
            )

            return Response(
                {"detail": "Already in Archive"},
                status=status.HTTP_208_ALREADY_REPORTED,
            )

        formatted_data = {
            "image_raw": INCOMING_URL + str(image),
            "image_hash": image_hash,
            "filename": str(image),
            "parent": "IncomingScreenshotFromUpload",
            "is_folder": False,
        }

        file_instance = File.objects.create(**formatted_data)
        default_storage.save(INCOMING_ROOT + str(image), image)

        api_response = format_api_response(
            status=status.HTTP_201_CREATED,
            message=UPLOAD_SUCCESS,
        )
        return Response(api_response, status=status.HTTP_201_CREATED)
