import sys
import glob
from PIL import Image
import imagehash
from DatabaseManager import DatabaseManager

class FingerprintManager:

    VALID_EXT = ["jpg", 'gif', "png"]
    ROOT_PATH = sys.path[0]
    MEDIA_FOLDER = "/media"
    ARCHIVE_FOLDER = "/Alpha-Project-Archive/"
    FULL_PATH = ROOT_PATH+MEDIA_FOLDER+ARCHIVE_FOLDER
    DATABASE = DatabaseManager()

    def count_elements(self):
        count = 0
        for ext in self.VALID_EXT:
            for path in glob.iglob(self.FULL_PATH + f'**/*.{ext}', recursive=True):
                count +=1

        return count

    def truncate_path(self, path):

        list_path = path.split("/")
        index = list_path.index(self.MEDIA_FOLDER[1:])

        return "/" + "/".join(list_path[index:])


    def build_archives_database(self, elements_count):
        count = 0
        for ext in self.VALID_EXT:
            for path in glob.iglob(self.FULL_PATH + f'**/*.{ext}', recursive=True):
                count +=1
                try:
                    self.save_image_hash(self.truncate_path(path), self.create_image_hash(path))
                except OSError:
                    pass

                self.loading_logger(count, elements_count)

        self.DATABASE.commit_change()
        self.DATABASE.close_database()

    def loading_logger(self, count, elements_count):
        print(f"{count}/{elements_count} loaded items")

    def create_image_hash(self, image_path):
        return imagehash.average_hash(Image.open(image_path))
        
    def save_image_hash(self, image_path, image_hash):
        self.DATABASE.add_image_and_hash(image_path, str(image_hash))

    # def save_hash(self, hash_):
    #     self.DATABASE.add_hash(str(hash_))

    # def save_image(self, image_path):
    #     self.DATABASE.add_image(image_path)

if __name__ == "__main__":
    fpm = FingerprintManager()
    elements_count = fpm.count_elements()
    fpm.build_archives_database(elements_count)