import pandas
import config
import json
from src.entities import Zone, ScreenshotText


class ZoneRepo:
    def __init__(
        self, zone_filepath=config.ZONES_SUBZONES_PATH, ocr_priority=config.OCR_PRIORITY
    ):
        self.zone_filepath = zone_filepath
        self.zones = []
        self.ocr_priority = ocr_priority
        self._load()

    def search_zone(self, text):
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

    def _load(self):
        with open(self.zone_filepath, "r") as j:
            zones = json.loads(j.read())

        for zone, subzones in zones.items():
            self.zones.append(Zone(zone, subzones))

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


class TextRepo:
    def __init__(self, text_filepath=config.SCREENSHOT_TEXTS_PATH):
        self.text_filepath = text_filepath
        self.texts = []
        self._load()

    def get_text_by_hash(self, hash_):
        for text in self.texts:
            if text.get_image_hash() == hash_:
                return text

        return None

    def _load(self):
        dataframe = pandas.read_csv(self.text_filepath)

        for index, row in dataframe.iterrows():
            self.texts.append(ScreenshotText(row))
