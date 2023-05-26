import sys
from pathlib import Path

VALID_EXT = [
    "jpg",
    "gif",
    "png",
    "jpeg",
    "bmp",
    "svg",
    "JPG",
    "GIF",
    "PNG",
    "JPEG",
    "BMP",
    "SVG",
]

THUMBNAIL_WIDTH = 180

MEDIA_FOLDER = "media/"  # Django auto add media/ to url
THUMBNAIL_FOLDER = "thumbnail/"
ICONS_FOLDER = "icons/"
ARCHIVE_FOLDER = "Alpha-Project-Archive/"

ROOT_PATH = str(Path(sys.path[0]).parent.parent) + "/"
THUMBNAIL_PATH = ROOT_PATH + MEDIA_FOLDER + THUMBNAIL_FOLDER
ICONS_PATH = ROOT_PATH + MEDIA_FOLDER + ICONS_FOLDER
FULL_PATH = ROOT_PATH + MEDIA_FOLDER + ARCHIVE_FOLDER

IGNORED_DIRECTORIES = ["Videos", "Text", ".git"]

DATABASE_HOST = "localhost"
DATABASE_USER = "root"
DATABASE_PASSWORD = "pwd"
DATABASE_NAME = "alpha_archives"

ELEMENT_TABLE_NAME = "file_file"
IMAGE_TABLE_NAME = "element_image"
HASH_IMAGE_TABLE_NAME = "element_hash_image"
