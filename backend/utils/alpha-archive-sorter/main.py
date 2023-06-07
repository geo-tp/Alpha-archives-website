import os
import pandas
import time
import glob
import config
from src import data, image, logger

logger.welcome_message()
results = image.analyze_images_type()
logger.dict_formatted_message(results)
logger.ask_press_enter()

# OCR texts extracted from screenshots holder
SCREENSHOT_TEXTS = data.ScreenshotTexts()

# Zones and subzones holder
ZONES = data.Zones()

# Create results folder if not exists
os.makedirs(config.RESULTS_PATH, exist_ok=True)

# Start sorting
counter = 0
copied_filepath = []
for ext in config.VALID_EXT:
    for path in glob.iglob(
        config.UNSORTED_ARCHIVE_PATH + f"**/*.{ext}", recursive=True
    ):
        img = image.load_image(path)
        hash_ = image.get_image_hash(img)

        if not hash_:
            continue

        texts = SCREENSHOT_TEXTS.get_by_hash(hash_)
        zone = ZONES.get_predictions(texts)

        if zone:
            image.copy_image(path, zone)
            copied_filepath.append(path)

        counter += 1
        logger.counter_message(counter)


logger.delete_message()
result = logger.ask_delete_confirmation()

if result == "DELETE":
    # Delete images from UNSORTED
    for path in copied_filepath:
        image.delete_image(path)
