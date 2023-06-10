import config
import json
import pandas
from src.entities import Zone, ScreenshotText, Screenshot
import glob
import os


class SortController:
    def __init__(
        self,
        view,
        zone_filepath=config.ZONES_SUBZONES_PATH,
        text_filepath=config.SCREENSHOT_TEXTS_PATH,
        screenshot_folderpath=config.UNSORTED_ARCHIVE_PATH,
        results_folderpath=config.RESULTS_PATH,
        ocr_priority=config.OCR_PRIORITY,
        valid_exts=config.VALID_EXT,
    ):
        self.zone_filepath = zone_filepath
        self.text_filepath = text_filepath
        self.screenshot_folderpath = screenshot_folderpath
        self.ocr_priority = ocr_priority
        self.valid_exts = valid_exts
        self.results_folderpath = results_folderpath

        self.view = view
        self.texts = []
        self.zones = []
        self.sorted_screenshots_filepath = []
        self._load_texts()
        self._load_zones()

    def start(self):
        self.view.welcome_message()
        unsorted_results = self._analyze_unsorted_folder()
        self.view.dict_formatted_message(unsorted_results)
        self.view.ask_press_enter()

        self._create_results_folder()

        counter = 0
        for ext in self.valid_exts:
            for path in glob.iglob(
                self.screenshot_folderpath + f"**/*.{ext}", recursive=True
            ):
                self._process_screenshot(path)
                counter += 1
                self.view.counter_message(counter)

        self.view.delete_message(self.results_folderpath)
        confirmation = self.view.ask_delete_confirmation()

        if confirmation:
            self._delete_sorted_files()

    def _create_results_folder(self):
        os.makedirs(self.results_folderpath, exist_ok=True)

    def _process_screenshot(self, path):
        ss = Screenshot(path)
        ss.load()

        hash_ = ss.get_hash()
        if not hash_:
            return

        texts = self._get_text_by_hash(hash_)
        if not texts:
            return

        zone = self._search_zone(texts)

        if zone:
            ss.copy(zone, self.results_folderpath)
            self.sorted_screenshots_filepath.append(path)

        ss.unload()

    def _delete_sorted_files(self):
        for path in self.sorted_screenshots_filepath:
            os.remove(path)

    def _analyze_unsorted_folder(self):
        """Categorize images by size"""
        SCREENSHOT_SIZE = [800, 1024, 1600]

        thumbnails = 0
        screenshot = 0
        weird_sized = 0

        for ext in config.VALID_EXT:
            for path in glob.iglob(
                self.screenshot_folderpath + f"**/*.{ext}", recursive=True
            ):
                ss = Screenshot(path)
                ss.load()
                width, height = ss.get_size()

                if width < 299:
                    thumbnails += 1
                elif width in SCREENSHOT_SIZE:
                    screenshot += 1
                else:
                    weird_sized += 1

                ss.unload()
        return {
            "Screenshots : ": screenshot,
            "Weird sized : ": weird_sized,
            "Thumbnails  : ": thumbnails,
        }

    def _get_text_by_hash(self, hash_):
        for text in self.texts:
            if text.get_image_hash() == hash_:
                return text

        return None

    def _search_zone(self, text):
        """Search zone in Screenshot texts"""

        easy_ocr_content = text.get_easy_ocr_content()
        wow_ocr_content = text.get_wow_ocr_content()

        # results placeholder for both OCR content
        results = [["", ""], ["", ""]]
        for i, content in enumerate([easy_ocr_content, wow_ocr_content]):
            # we cant determine subzone if content is too short
            if not content or len(content) < 6:
                results[i] = []
                continue

            j = 6
            # add a char to keywords until result is unique
            while len(results[i]) > 1:
                results[i] = self._get_zones_of_keywords(content[:j])
                j += 1
                if j > len(content):
                    break

        return self._priority_result(results)

    def _get_zones_of_keywords(self, keywords):
        found_zones = []

        for zone in self.zones:
            for subzone in zone.get_subzones():
                if keywords in subzone:
                    subzone_name = zone.get_name()
                    found_zones.append(
                        subzone_name
                    ) if subzone_name not in found_zones else None

        return found_zones

    def _priority_result(self, results):
        result = None
        easy_ocr = results[0]
        wow_ocr = results[1]

        # No results found for both models
        if not easy_ocr and not wow_ocr:
            return result

        if easy_ocr and self.ocr_priority == "easy_ocr":
            result = easy_ocr[0]
        elif wow_ocr and self.ocr_priority == "wow_ocr":
            result = wow_ocr[0]

        # if priority result is None, we take the other
        if not result:
            try:
                result = easy_ocr[0]
            except IndexError:
                result = wow_ocr[0]

        return result

    def _load_zones(self):
        self.zones = []
        with open(self.zone_filepath, "r") as j:
            zones = json.loads(j.read())

        for zone, subzones in zones.items():
            self.zones.append(Zone(zone, subzones))

    def _load_texts(self):
        self.texts = []
        dataframe = pandas.read_csv(self.text_filepath)

        for index, row in dataframe.iterrows():
            self.texts.append(ScreenshotText(row))
