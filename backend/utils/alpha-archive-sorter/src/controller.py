import config
import json
from src.entities import Zone, ScreenshotText, Screenshot
import glob
import os


class SortController:
    def __init__(
        self,
        view,
        zone_repo,
        text_repo,
        screenshot_folderpath=config.UNSORTED_ARCHIVE_PATH,
        results_folderpath=config.RESULTS_PATH,
        valid_exts=config.VALID_EXT,
    ):
        self.screenshot_folderpath = screenshot_folderpath
        self.valid_exts = valid_exts
        self.results_folderpath = results_folderpath

        self.view = view
        self.text_repo = text_repo
        self.zone_repo = zone_repo
        self.sorted_screenshots_filepath = []

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

        texts = self.text_repo.get_text_by_hash(hash_)
        if not texts:
            return

        zone = self.zone_repo.search_zone(texts)

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
