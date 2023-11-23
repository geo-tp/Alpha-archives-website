from PIL import Image
import imagehash
import config
import glob
import os
import shutil


class Screenshot:
    def __init__(self, filepath):
        self.filepath = filepath
        self.image = None

    def load(self):
        self.image = Image.open(self.filepath)

    def unload(self):
        del self.image
        self.image = None

    def get_hash(self):
        if not self.image:
            assert "Image is not loaded"

        try:
            return str(imagehash.average_hash(self.image))
        except OSError:
            return None

    def get_size(self):
        if not self.image:
            assert "Image is not loaded"

        return [self.image.width, self.image.height]

    def get_name(self):
        return os.path.basename(self.filepath)

    def copy(self, zone_folder, dest):
        filename = self.get_name()
        path_copy = os.path.join(dest, zone_folder, filename)
        os.makedirs(os.path.join(dest, zone_folder), exist_ok=True)
        shutil.copy(self.filepath, path_copy)


class ScreenshotText:
    def __init__(self, data):
        self.image_hash = data["image_hash"]
        self.easy_ocr_content = self._format_content(data["easy_ocr_content"])
        self.wow_ocr_content = self._format_content(data["wow_ocr_content"])

    def get_wow_ocr_content(self):
        return self.wow_ocr_content

    def get_easy_ocr_content(self):
        return self.easy_ocr_content

    def get_image_hash(self):
        return self.image_hash

    def _format_content(self, content):
        content = str(content).lower()
        # we remove first 'the ' if any
        content = content if content[:4].lower() != "the " else content[4:]

        return content


class Zone:
    def __init__(self, zone, subzones):
        self.name = zone
        self.subzones = [subzone.lower() for subzone in subzones]

    def get_subzones(self):
        return self.subzones

    def get_name(self):
        return self.name
