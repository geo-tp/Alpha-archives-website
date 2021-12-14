import sys
from pathlib import Path

VALID_EXT = ["jpg", 'gif', "png" "jpeg", "bmp", "JPG", 'GIF', "PNG" "JPEG", "BMP"]
THUMBNAIL_WIDTH = 80
MEDIA_FOLDER = "/media"
THUMBNAIL_FOLDER = "/thumbnail/"
ICONS_FOLDER = "/icons/"
ROOT_PATH = str(Path(sys.path[0]).parent)
THUMBNAIL_PATH = ROOT_PATH + MEDIA_FOLDER + THUMBNAIL_FOLDER
ICONS_PATH = ROOT_PATH + MEDIA_FOLDER + ICONS_FOLDER
ARCHIVE_FOLDER = "/Alpha-Project-Archive/"
FULL_PATH = ROOT_PATH+MEDIA_FOLDER+ARCHIVE_FOLDER
DATABASE_NAME = "alpha_archives"
IMAGE_TABLE_NAME = "element_image"
HASH_IMAGE_TABLE_NAME= "element_hash_image"
ELEMENT_TABLE_NAME = "element_element"
IGNORED_DIRECTORIES = ["Videos", "Text", ".git"]
