import sys
import os
import glob
from PIL import Image
import imagehash
from DatabaseManager import DatabaseManager
import constants

class ParserManager:

    DATABASE = DatabaseManager()

    def count_elements(self):
        count = 0
        for ext in constants.VALID_EXT:
            for path in glob.iglob(constants.FULL_PATH + f'**/*.{ext}', recursive=True):
                count +=1

        return count

    def truncate_path(self, path):

        list_path = path.split("/")
        index = list_path.index(constants.MEDIA_FOLDER[1:])

        return "/" + "/".join(list_path[index:])

    def extract_filename_from_path(self, path):
        return path.split("/")[-1]

    def extract_parent_folder_from_path(self, path):
        return path.split("/")[-2]

    def find_all_directories(self, path):
        
        root_directories = [[directory, self.truncate_path(path), "root", 0]\
                                     for directory in os.listdir(path[0:-1])\
                                          if os.path.isdir(path+directory)]

        subdirectories = self.find_all_subdirectories(path, [])

        return root_directories + subdirectories


    def find_all_subdirectories(self, path, tab):

        for item in os.listdir(path):
                full_dir_path = path+item
                if os.path.isdir(full_dir_path):
                    # Avoid hidden folder (.git...)
                    if item[0] != '.':
                        parent = self.extract_parent_folder_from_path(path)
                        tab.append([item, full_dir_path, parent])
                        tab = self.find_all_subdirectories(full_dir_path+"/", tab)

        return tab


    def build_archives_database(self):
        parents_and_directories = self.find_all_directories(constants.FULL_PATH)
        items_count = self.count_elements() + len(parents_and_directories)
        count = 0

        # # CREATE ELEMENT FILES & HASH IMAGES
        for ext in constants.VALID_EXT:
            for path in glob.iglob(constants.FULL_PATH + f'**/*.{ext}', recursive=True):
                try:
                    #Hash_Image
                    self.save_image_hash(self.truncate_path(path), self.create_image_hash(path))

                    filename = self.extract_filename_from_path(path)
                    parent = self.extract_parent_folder_from_path(path)
                    is_file = True
                    image_id = self.DATABASE.get_last_inserted_id()

                    #Element (only files, not dir)
                    self.save_element(filename, path, parent, is_file, image_id)

                except OSError:
                    pass

                count +=1
                self.loading_logger(count, items_count)
        
        # CREATE ELEMENT DIRECTORIES
        for parent_and_directory in parents_and_directories:
            name = parent_and_directory[0]
            path = self.truncate_path(parent_and_directory[1])
            parent = parent_and_directory[2]

            self.save_element(name, path, parent, 0)
            count +=1
            self.loading_logger(count, items_count)

        self.DATABASE.commit_change()
        self.DATABASE.close_database()

    def loading_logger(self, count, elements_count):
        print(f"{count}/{elements_count} loaded items")

    def create_image_hash(self, image_path):
        return imagehash.average_hash(Image.open(image_path))
        
    def save_image_hash(self, image_path, image_hash):
        self.DATABASE.add_image_and_hash(image_path, str(image_hash))
    
    def save_element(self, name, path, parent, is_file, image_id=None):
        self.DATABASE.add_element(name, path, parent, is_file, image_id)

if __name__ == "__main__":
    fpm = ParserManager()
    fpm.build_archives_database()