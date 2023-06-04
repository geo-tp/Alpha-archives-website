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
TOKEN = "9x3l2jHJfJ0efSzk3lf4zhaA"


class ImageTextViewSet(viewsets.ModelViewSet):
    queryset = ImageText.objects.all()
    pagination_class = None
    permission_classes = [permissions.AllowAny]
    serializer_class = ImageTextSerializer

    def create(self, request, *args, **kwargs):
        """
        {
            image_hash: string,
            wow_ocr_content?: string,
            easy_ocr_content?: string,
            token: string
        }
        """
        if request.data.get("token") != TOKEN:
            return Response({"status": 403}, status=403)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        ImageText.objects.create(**serializer.validated_data)

        return Response({"status": 200}, status=status.HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        if request.data.get("token") != TOKEN:
            return Response({"status": 403}, status=403)

        return super().update(request, *args, **kwargs)

    def partial_update(self, request, *args, **kwargs):
        if request.data.get("token") != TOKEN:
            return Response({"status": 403}, status=403)

        return super().partial_update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        if request.data.get("token") != TOKEN:
            return Response({"status": 403}, status=403)

        return super().destroy(request, *args, **kwargs)
