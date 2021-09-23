import sys

VALID_EXT = ["jpg", 'gif', "png"]
ROOT_PATH = sys.path[0][0:-6]
MEDIA_FOLDER = "/media"
ARCHIVE_FOLDER = "/Alpha-Project-Archive/"
FULL_PATH = ROOT_PATH+MEDIA_FOLDER+ARCHIVE_FOLDER
DATABASE_NAME = "alpha_archives"
IMAGE_TABLE_NAME = "element_image"
HASH_TABLE_NAME = "element_hash"
HASH_IMAGE_TABLE_NAME= "element_hash_image"
ELEMENT_TABLE_NAME = "element_element"

print(ROOT_PATH)