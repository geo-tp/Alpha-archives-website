from django.shortcuts import render
from .utils import is_hdd_full
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view


# Create your views here.
@api_view(["GET"])
def upload_status(request):

    if is_hdd_full():
        return Response(status=status.HTTP_403_FORBIDDEN, data={"error": "HDD is full, you can't upload now"})
    else:
        return Response(status=status.HTTP_200_OK, data={"upload": "You can upload"})