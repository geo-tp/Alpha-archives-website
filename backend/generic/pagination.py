from rest_framework.pagination import LimitOffsetPagination
from rest_framework import status
from generic.response import format_api_response
from rest_framework.response import Response


class CustomLimitOffsetPagination(LimitOffsetPagination):
    def get_paginated_response(self, data):

        api_response = format_api_response(
            content=data,
            count=self.count,
            next_=self.get_next_link(),
            previous=self.get_previous_link(),
            pagination=True if self.get_next_link() else False,
        )

        return Response(api_response, status=status.HTTP_200_OK)
