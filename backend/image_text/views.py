from rest_framework import viewsets
from .models import ImageText
from .serializers import ImageTextSerializer
import django_filters.rest_framework
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action

# OCR ENDOINT - IMAGE TO TEXT
# THIS IS ONLY USED TO PARSE IMAGE VIA GOOGLE COLAB AND SAVE RESULTS
# You can send on this endpoint : {image_hash: string, content: string, token: string} with the permission token below
TOKEN = "9x3l2jHJfJ0efSzk3lf4zhaA"


class ImageTextViewSet(viewsets.ModelViewSet):
    queryset = ImageText.objects.all()
    pagination_class = None
    permission_classes = [permissions.AllowAny]
    serializer_class = ImageTextSerializer

    def create(self, request, *args, **kwargs):
        if request.data.get("token") != TOKEN:
            return Response({"status": 403}, status=403)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        ImageText.objects.create(**serializer.validated_data)

        return Response({"status": 200}, status=status.HTTP_200_OK)
