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
from generic.permissions import IsStaffAuthenticated


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [permissions.AllowAny]
    pagination_class = None

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """

        if self.action in ["create", "destroy", "update"]:
            return [IsStaffAuthenticated()]

        return [permission() for permission in self.permission_classes]

    def update(self, request, pk, *args, **kwargs):
        partial = kwargs.pop("partial", False)
        instance = self.get_object()
        user = request.user

        # Only admin can modify all tags, staff member can only update their own tags
        if instance.user.id != request.user.id and not user.is_superuser:
            api_response = format_api_response(
                message="Unauthorized, you can only manage your own tags",
                status=status.HTTP_401_UNAUTHORIZED,
                error=True,
            )
            return Response(api_response, status=status.HTTP_401_UNAUTHORIZED)

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
        user = request.user

        tag = Tag.objects.create(user=user, name=name)
        serializer = self.get_serializer(tag)

        api_response = format_api_response(
            content=serializer.data, status=status.HTTP_200_OK
        )

        return Response(api_response, status=status.HTTP_200_OK)


class AppliedTagViewSet(viewsets.ModelViewSet):
    queryset = AppliedTag.objects.all()
    serializer_class = AppliedTagSerializer
    permission_classes = [permissions.AllowAny]
    pagination_class = None

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """

        if self.action in ["create", "destroy", "update"]:
            return [IsStaffAuthenticated()]

        return [permission() for permission in self.permission_classes]

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        api_response = format_api_response(
            content=serializer.data, status=status.HTTP_200_OK
        )

        return Response(api_response, status=status.HTTP_200_OK)
