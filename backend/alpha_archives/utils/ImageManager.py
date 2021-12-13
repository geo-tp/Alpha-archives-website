from io import BytesIO
from django.core.files import File
from PIL import Image
from rest_framework.response import Response
from django.http import HttpResponse
import sys
from constants import THUMBNAIL_PATH, THUMBNAIL_FOLDER, THUMBNAIL_WIDTH
from random import choice
from shutil import rmtree
from os import mkdir

class ImageManager:

    counter = 1


    @classmethod
    def make_thumbnail(cls, image) -> object:
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

    @classmethod
    def open_image(cls, path) -> object:
        img = Image.open(path) 

        return img

    # @classmethod
    # def get_salt(cls):
        
    #     while 1:
    #         salt = ''
    #         for i in range(16):
    #             salt += choice(cls.ALPHABET)
    #         if salt not in salt_list:
    #             salt_list.append(salt)
    #             break

    #     return salt

    @classmethod
    def get_image_name(cls, path) -> str:
        return path.split('/')[-1]

    @classmethod
    def get_image_ext(cls, filename) -> str:
        return "."+filename.split(".")[-1]


    @classmethod
    def save_thumbnail(cls, thumbnail) -> str:
        number = str(cls.counter)
        image_name = cls.get_image_name(thumbnail.filename)
        ext = cls.get_image_ext(image_name)
        path = THUMBNAIL_PATH+number+ext
        django_path = THUMBNAIL_FOLDER+number+ext
        thumbnail.save(path)

        cls.counter +=1

        return django_path 

    @classmethod
    def delete_all_thumbnail_files(cls) -> None:
        try:
            rmtree(THUMBNAIL_PATH)
        except FileNotFoundError:
            pass
        
        mkdir(THUMBNAIL_PATH)

# if __name__ == "__main__":

#     delete_all_thumbnail_files()