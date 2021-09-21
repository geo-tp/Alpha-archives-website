import mysql.connector

class DatabaseManager:

    DATABASE_NAME = "alpha_archives"

    IMAGE_TABLE_NAME = "element_image"
    HASH_TABLE_NAME = "element_hash"
    HASH_IMAGE_TABLE_NAME= "element_hash_image"
    ELEMENT_TABLE_NAME = "element_element"

    def __init__(self):
        self.database = mysql.connector.connect(
            host="localhost",
            user="root",
            password="pwd"
        )

        self.cursor = self.database.cursor()

    # def add_image(self, path):
    #     sql = f"INSERT INTO {self.DATABASE_NAME}.{self.IMAGE_TABLE_NAME} (path) VALUES(%s)"
    #     val = (path,)

    #     self.cursor.execute(sql, val)

    # def add_hash(self, path, hash_):
    #     sql = f"INSERT INTO {self.DATABASE_NAME}.{self.HASH_TABLE_NAME} (image_hash) VALUES(%s)"
    #     val = (hash_,)

    #     self.cursor.execute(sql, val)

    def add_image_and_hash(self, path, hash_):
        sql = f"INSERT INTO {self.DATABASE_NAME}.{self.HASH_IMAGE_TABLE_NAME} (image_path, image_hash) VALUES(%s, %s)"
        val = (path, hash_)

        self.cursor.execute(sql, val)

    # def add_element(self, element):
    #     sql = f"INSERT INTO {self.DATABASE_NAME}.{self.ELEMENT_TABLE_NAME} (elment) VALUES(%s)"
    #     val = (element,)

    #     self.cursor.execute(sql, val)

    def commit_change(self):
        self.database.commit()

    def close_database(self):
        self.database.close()


if __name__ == "__main__":
    pass
    # db = DatabaseManager()
    # db.commit_change()
    # db.close_database()