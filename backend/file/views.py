from psutil import disk_usage
import random
import imagehash
from PIL import Image as Img
from copy import deepcopy
from django.shortcuts import render
from django.db.models import Q
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
from rest_framework import filters, status, viewsets, mixins
from rest_framework.decorators import action
from tag.serializers import CustomAppliedTagSerializer
from tag.models import AppliedTag, Tag
from file.serializers import FileSerializer
from django.conf import settings


class FileViewSet(
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet,
):

    queryset = File.objects.all()
    pagination_class = None
    serializer_class = FileSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [
        django_filters.rest_framework.DjangoFilterBackend,
        filters.OrderingFilter,
    ]
    filterset_fields = ["parent", "filename"]

    def get_serializer(self, *args, **kwargs):
        print(self.action)
        if self.action == "create":
            return UploadFileSerializer(*args, **kwargs)

        elif self.action == "search_by_tags":
            return CustomAppliedTagSerializer(*args, **kwargs)
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

    @action(methods=["get"], detail=False)
    def random(self, request, *args, **kwargs):
        first_element_id = int(File.objects.first().id)
        last_element_id = int(File.objects.last().id)

        random_num = random.randrange(first_element_id, last_element_id)
        random_element = File.objects.get(id=random_num)

        while random_element.is_folder:
            random_num = random.randrange(first_element_id, last_element_id)
            random_element = File.objects.get(id=random_num)

        serializer = self.get_serializer(random_element)

        random_num -= first_element_id if first_element_id != 1 else 0
        total_num = last_element_id - (first_element_id if first_element_id != 1 else 0)
        data = {"random_number": random_num, "total_number": total_num}
        data.update(serializer.data)

        api_response = format_api_response(status=status.HTTP_200_OK, content=data)

        return Response(status=status.HTTP_200_OK, data=data)

    @action(
        methods=["post"],
        detail=False,
    )
    def search_by_tags(self, request):

        serializer = self.get_serializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)

        tags_array = [data["name"] for data in serializer.data]
        applied_tags = AppliedTag.objects.filter(tag_id__in=tags_array)
        images_hash = [data.file_hash for data in applied_tags]
        files = File.objects.filter(image_hash__in=images_hash)
        serialized_files = FileSerializer(files, many=True)
        api_response = format_api_response(
            status=status.HTTP_200_OK,
            content=serialized_files.data,
        )
        return Response(api_response, status=status.HTTP_200_OK)

    @action(
        methods=["get"],
        detail=False,
    )
    def upload_status(self, request):

        hdd = disk_usage("/")

        if hdd.free / (2**30) < settings.DISABLE_UPLOAD_SERVER_HDD_SPACE_LEFT:
            return Response(
                status=status.HTTP_403_FORBIDDEN,
                data={"error": "HDD is full, you can't upload now"},
            )
        else:
            return Response(
                status=status.HTTP_200_OK, data={"upload": "You can upload"}
            )
