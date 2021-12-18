import mysql.connector
import constants

class DatabaseManager:

    def __init__(self):
        self.database = mysql.connector.connect(
            host="localhost",
            user="root",
            password="pwd"
        )

        self.cursor = self.database.cursor()

    def get_last_inserted_id(self):
        return self.cursor.lastrowid

    def remove_table_rows(self, table_name):
        sql = f"DELETE from {constants.DATABASE_NAME}.{table_name};"

        self.cursor.execute(sql)

    def add_image_and_hash(self, path, hash_):
        sql = f"INSERT INTO {constants.DATABASE_NAME}.{constants.HASH_IMAGE_TABLE_NAME} (image_path, image_hash) VALUES(%s, %s)"
        val = (path, hash_)

        self.cursor.execute(sql, val)

    def add_element(self, name, path, parent, is_file, image_id):
        print(path)
        try:
            sql = f"INSERT INTO {constants.DATABASE_NAME}.{constants.ELEMENT_TABLE_NAME} (name, thumbnail_path, parent, is_file, image_id) VALUES(%s, %s, %s, %s, %s)"
            val = (name, path, parent, is_file, image_id)

            self.cursor.execute(sql, val)
        except mysql.connector.errors.DataError:
            print(path)
            quit(1)
            
    def commit_change(self):
        self.database.commit()

    def close_database(self):
        self.database.close()
