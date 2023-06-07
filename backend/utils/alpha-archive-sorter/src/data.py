import pandas
import config
import json


class ScreenshotTexts:
    def __init__(self, csv_path=config.SCREENSHOT_TEXTS_PATH):
        self.df = pandas.read_csv(csv_path)
        self.df.set_index("image_hash", inplace=True)

    def get_by_hash(self, hash_):
        """Return img corresponding to hash"""
        try:
            easy_ocr_content, wow_ocr_content = self.df.loc[hash_]
            easy_ocr_content = self._format_content(easy_ocr_content)
            wow_ocr_content = self._format_content(wow_ocr_content)

        except:
            easy_ocr_content = ""
            wow_ocr_content = ""

        return {
            "easy_ocr_content": easy_ocr_content,
            "wow_ocr_content": wow_ocr_content,
        }

    def _format_content(self, content):
        content = str(content)
        # we remove first 'the ' if any
        content = content if content[:4].lower() != "the " else content[4:]

        return content


class Zones:
    def __init__(self, json_path=config.ZONES_SUBZONES_PATH):
        with open(json_path, "r") as j:
            contents = json.loads(j.read())

        self.zones = contents

    def get_predictions(self, texts):
        """Get zone corresponding to a subzone"""
        easy_ocr_content = texts["easy_ocr_content"]
        wow_ocr_content = texts["wow_ocr_content"]

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

    def _priority_result(self, results, priority=config.OCR_PRIORITY):
        result = None
        easy_ocr = results[0]
        wow_ocr = results[1]

        # No results found for both models
        if not easy_ocr and not wow_ocr:
            return result

        if easy_ocr and priority == "easy_ocr":
            result = easy_ocr[0]
        elif wow_ocr and priority == "wow_ocr":
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

        for zone, subzones in self.zones.items():
            for subzone in subzones:
                if keywords in subzone.lower():
                    found_zones.append(zone) if zone not in found_zones else None

        return found_zones
