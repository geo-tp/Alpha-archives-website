from PIL import Image
import imagehash
import config
import glob
import os
import shutil


def load_image(image_path) -> object:
    return Image.open(image_path)


def delete_image(image_path) -> None:
    os.remove(image_path)


def copy_image(src, zone_folder, dest=config.RESULTS_PATH) -> None:
    filename = get_image_name(src)
    path_copy = f"{dest}{zone_folder}/{filename}"
    os.makedirs(dest + zone_folder, exist_ok=True)
    shutil.copy(src, path_copy)


def get_image_hash(image) -> str:
    try:
        return str(imagehash.average_hash(image))
    except OSError:
        return None


def get_image_name(image_path) -> str:
    return image_path.split("/")[-1]


def analyze_images_type(folder_path=config.UNSORTED_ARCHIVE_PATH) -> dict:
    """Categorize images by size"""
    SCREENSHOT_SIZE = [800, 1024, 1600]

    thumbnails = 0
    screenshot = 0
    weird_sized = 0

    for ext in config.VALID_EXT:
        for path in glob.iglob(folder_path + f"**/*.{ext}", recursive=True):
            img = load_image(path)
            width, height = img.size

            if width < 299:
                thumbnails += 1
            elif width in SCREENSHOT_SIZE:
                screenshot += 1
            else:
                weird_sized += 1

    return {
        "Screenshots : ": screenshot,
        "Weird sized : ": weird_sized,
        "Thumbnails  : ": thumbnails,
    }
