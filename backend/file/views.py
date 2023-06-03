from psutil import disk_usage
import random
import imagehash
from PIL import Image as Img
from copy import deepcopy
from django.shortcuts import render
from django.db.models import Q
from django.core.files.storage import default_storage
from django.utils.decorators import method_decorator
from django.core.files.base import ContentFile
import django_filters.rest_framework
from rest_framework import viewsets
from rest_framework import permissions
from file.models import File
from file.serializers import FileSerializer, UploadFileSerializer
from rest_framework.response import Response
from rest_framework import status
from config.settings import INCOMING_ROOT, INCOMING_URL
from generic.response import format_api_response
from file.messages import ALREADY_IN_ARCHIVE, UPLOAD_SUCCESS
from rest_framework import filters, status, viewsets, mixins
from rest_framework.decorators import action
from tag.serializers import CustomAppliedTagSerializer
from tag.models import AppliedTag, Tag
from file.serializers import FileSerializer
from image_text.serializers import ImageTextSerializer
from image_text.models import ImageText
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
        if self.action == "create":
            return UploadFileSerializer(*args, **kwargs)

        elif self.action == "search_by_tags":
            return CustomAppliedTagSerializer(*args, **kwargs)
        else:
            return FileSerializer(*args, **kwargs)

    def generate_image_hash(self, image_path):
        return imagehash.average_hash(Img.open(image_path))

    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    def create(self, request):
        """
        Upload a file
        """

        if settings.DISABLE_UPLOAD:
            return Response(
                {"detail": "Upload is disabled"},
                status=status.HTTP_403_FORBIDDEN,
            )

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        image = request.FILES["image"]
        image_hash = self.generate_image_hash(image)

        # image is already in archive
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

        # Image is new, we create file model and we store it
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
        """
        Get a random file (used for random screenshot box)
        """
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
        methods=["get"],
        detail=False,
    )
    def search_by_keywords(self, request):
        """
        Find screenshots by filtering with screen rendered text
        """
        keywords = request.query_params.get("k", None)
        splitted_keywords = []
        texts = []

        if keywords:
            texts = ImageText.objects.filter(combined_content__icontains=keywords)

        # If nothing found, we will spit keywords if possible
        if not texts and " " in keywords:
            splitted_keywords = keywords.split(" ")
            texts = ImageText.objects.filter(
                combined_content__icontains=splitted_keywords[0]
            )
            splitted_keywords = splitted_keywords[1:]

            for word in splitted_keywords:
                texts = texts.filter(combined_content__icontains=word)

        found_hashes = []
        for text in texts:
            found_hashes.append(text.image_hash)

        files = self.queryset.filter(image_hash__in=found_hashes)
        serializer = self.get_serializer(files, many=True)

        api_response = format_api_response(
            status=status.HTTP_200_OK,
            content=serializer.data[:500],
        )

        return Response(api_response, status=status.HTTP_200_OK)

    @action(
        methods=["post"],
        detail=False,
    )
    def search_by_tags(self, request):
        """
        Find screenshots by filtering with multiple tags
        """
        serializer = self.get_serializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)

        tags_array = [data["name"] for data in serializer.data]

        # we get applied tags from first submitted tag name
        applied_tags = AppliedTag.objects.filter(tag_id=tags_array[0])

        # # we get image hash from applied tags
        images_hash = [data.file_hash for data in applied_tags]

        if len(tags_array) == 1:
            results = images_hash

        else:
            results = []
            # if there is more than one tags, we filters images_hash with other tags
            for i in range(1, len(tags_array)):
                for hash_ in images_hash:
                    if AppliedTag.objects.filter(
                        tag=tags_array[i], file_hash=hash_
                    ).exists():
                        results.append(hash_)

        files = File.objects.filter(image_hash__in=results)

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
        """
        Get the upload status
        if hdd dont have enough free space upload status will return false
        """
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
