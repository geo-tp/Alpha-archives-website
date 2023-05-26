import sys
import os
import glob
from PIL import Image
import imagehash
from Database import Database
from Img import Img
import constants


class Parser:
    DATABASE = Database()
    elements_count = 0

    def count_elements(self):
        count = 0
        for ext in constants.VALID_EXT:
            for path in glob.iglob(constants.FULL_PATH + f"**/*.{ext}", recursive=True):
                count += 1

        return count

    def truncate_path(self, path):
        list_path = path.split("/")
        index = list_path.index(constants.MEDIA_FOLDER[:-1])

        return "/" + "/".join(list_path[index + 1 :])

    def extract_filename_from_path(self, path):
        return path.split("/")[-1]

    def extract_parent_folder_from_path(self, path):
        return path.split("/")[-2]

    def replace_white_space(self, filename):
        return filename.replace(" ", "_")

    def find_all_directories(self, path):
        root_directories = [
            [directory, self.truncate_path(path), "root", 0]
            for directory in os.listdir(path[0:-1])
            if os.path.isdir(path + directory)
            and directory not in constants.IGNORED_DIRECTORIES
        ]

        subdirectories = self.find_all_subdirectories(path, [])

        return root_directories + subdirectories

    def find_all_subdirectories(self, path, tab):
        for item in os.listdir(path):
            full_dir_path = path + item
            if os.path.isdir(full_dir_path):
                # Avoid hidden folder (.git...)
                if item[0] != ".":
                    parent = self.extract_parent_folder_from_path(path)
                    tab.append([item, full_dir_path, parent])
                    tab = self.find_all_subdirectories(full_dir_path + "/", tab)

        return tab

    def create_elements(self, items_count):
        # # CREATE ELEMENT FILES
        for ext in constants.VALID_EXT:
            for path in glob.iglob(constants.FULL_PATH + f"**/*.{ext}", recursive=True):
                try:
                    image_path = self.truncate_path(path)
                    image_hash = self.get_image_hash(path)
                    filename = self.extract_filename_from_path(path)
                    parent = self.extract_parent_folder_from_path(path)
                    is_folder = False
                    image_id = self.DATABASE.get_last_inserted_id()
                    thumbnail = Img.make_thumbnail(path)
                    thumbnail_path = Img.save_thumbnail(thumbnail)

                    # image file is saved to database
                    self.save_element_to_database(
                        filename,
                        parent,
                        is_folder,
                        image_path,
                        thumbnail_path,
                        image_hash,
                    )

                except OSError:
                    pass

                self.loading_logger(items_count)

    def create_directories(self, items_count, parents_and_directories):
        # CREATE ELEMENT DIRECTORIES
        for parent_and_directory in parents_and_directories:
            filename = parent_and_directory[0]
            parent = parent_and_directory[2]
            is_folder = True

            self.save_element_to_database(filename, parent, is_folder)
            self.loading_logger(items_count)

    def loading_logger(self, elements_count):
        self.elements_count += 1

        if self.elements_count % 100 == 0:
            print(f"{self.elements_count}/{elements_count} loaded items")

    def get_image_hash(self, image_path):
        return str(imagehash.average_hash(Image.open(image_path)))

    def save_element_to_database(
        self,
        filename,
        parent,
        is_folder,
        image_path=None,
        thumbnail_path=None,
        image_hash=None,
    ):
        self.DATABASE.add_element(
            filename, parent, is_folder, image_path, thumbnail_path, image_hash
        )

    def build_archives_database(self):
        self.DATABASE.remove_table_rows(constants.ELEMENT_TABLE_NAME)
        Img.delete_all_thumbnail_files()
        parents_and_directories = self.find_all_directories(constants.FULL_PATH)
        items_count = self.count_elements() + len(parents_and_directories)

        self.create_elements(items_count)
        self.create_directories(items_count, parents_and_directories)

        self.DATABASE.commit_change()
        self.DATABASE.close_database()
