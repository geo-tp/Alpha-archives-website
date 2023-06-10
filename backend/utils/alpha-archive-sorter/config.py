import os

CURRENT_PATH = os.getcwd()

# Screenshot texts csv file
SCREENSHOT_TEXTS_PATH = os.path.join(CURRENT_PATH, "screenshot_texts.csv")

# Zone and subzones json file
ZONES_SUBZONES_PATH = os.path.join("ocr_zones.json")

# Location of UNSORTED folder
UNSORTED_ARCHIVE_PATH = "/home/user/Bureau/Ashenvale/"

# Location of sort results
RESULTS_PATH = os.path.join(CURRENT_PATH, "results/")

print(RESULTS_PATH)

VALID_EXT = [
    "jpg",
    "gif",
    "png",
    "jpeg",
    "bmp",
    "JPG",
    "GIF",
    "PNG",
    "JPEG",
    "BMP",
]


# Define what OCR result should be prefered :
# easy_ocr || wow_ocr
OCR_PRIORITY = "wow_ocr"
