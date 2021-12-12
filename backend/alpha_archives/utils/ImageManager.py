from io import BytesIO
from django.core.files import File
from PIL import Image
from rest_framework.response import Response
from django.http import HttpResponse
import sys
from constants import THUMBNAIL_PATH, THUMBNAIL_FOLDER, THUMBNAIL_WIDTH
from random import choice

ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
salt_list = []

def make_thumbnail(image):
    """Makes thumbnails of given size from given image"""
    
    ext = image.split(".")[-1].upper()

    im = Image.open(image)

    width, height = im.size

    w_ratio = width / THUMBNAIL_WIDTH
    h_ratio = height / THUMBNAIL_WIDTH

    final_height = int(THUMBNAIL_WIDTH*h_ratio/w_ratio)

    if ext in ["JPG", "JPEG"]:
        im.convert("RGB")
        ext = "JPEG"

    im.thumbnail((THUMBNAIL_WIDTH, final_height)) # resize image

    thumb_io = BytesIO() # create a BytesIO object

    im.save(thumb_io, ext, quality=75, optimize=True) # save image to BytesIO object

    # thumbnail = File(thumb_io, name=im.name) # create a django friendly File object

    return im

def open_image(path):
    img = Image.open(path) 

    return img

def get_salt():
    
    while 1:
        salt = ''
        for i in range(16):
            salt += choice(ALPHABET)
        if salt not in salt_list:
            salt_list.append(salt)
            break

    return salt

def get_image_name(path):
    return path.split('/')[-1]

def get_image_ext(filename):
    return "."+filename.split(".")[-1]

def save_thumbnail(thumbnail):
    salt = get_salt()
    image_name = get_image_name(thumbnail.filename)
    ext = get_image_ext(image_name)
    path = THUMBNAIL_PATH+salt+ext
    django_path = THUMBNAIL_FOLDER+salt+ext
    thumbnail.save(path)

    return django_path 
