from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import permissions
from tag.models import Tag, AppliedTag
from tag.serializers import TagSerializer, AppliedTagSerializer
from generic.response import format_api_response
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import action
from tag.serializers import CustomAppliedTagSerializer
from user.models import CustomUser


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [permissions.AllowAny]
    pagination_class = None

    def update(self, request, pk, *args, **kwargs):
        partial = kwargs.pop("partial", False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, "_prefetched_objects_cache", None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        old_tag = Tag.objects.get(name=pk)
        AppliedTag.objects.filter(tag=old_tag).update(tag=instance)
        old_tag.delete()

        return Response(serializer.data)

        # response = super().update(request)

    def list(self, request, *args, **kwargs):
        response = super().list(request)

        api_response = format_api_response(
            content=response.data, status=status.HTTP_200_OK
        )

        return Response(api_response, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        name = serializer.data["name"]
        user = CustomUser.objects.get(id=1)

        tag = Tag.objects.create(user=user, name=name)
        serializer = self.get_serializer(tag)

        api_response = format_api_response(
            content=serializer.data, status=status.HTTP_200_OK
        )

        return Response(api_response, status=status.HTTP_200_OK)

    # def destroy(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     self.perform_destroy(instance)
    #     return Response(status=status.HTTP_204_NO_CONTENT)


class AppliedTagViewSet(viewsets.ModelViewSet):
    queryset = AppliedTag.objects.all()
    serializer_class = AppliedTagSerializer
    permission_classes = [permissions.AllowAny]
    pagination_class = None

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        api_response = format_api_response(
            content=serializer.data, status=status.HTTP_200_OK
        )

        return Response(api_response, status=status.HTTP_200_OK)
