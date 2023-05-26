import mysql.connector
import config


class Database:
    def __init__(self):
        self.database = mysql.connector.connect(
            host=config.DATABASE_HOST,
            user=config.DATABASE_USER,
            password=config.DATABASE_PASSWORD,
        )

        self.cursor = self.database.cursor()

    def get_last_inserted_id(self):
        return self.cursor.lastrowid

    def remove_table_rows(self, table_name):
        sql = f"DELETE from {config.DATABASE_NAME}.{table_name};"

        self.cursor.execute(sql)

    def add_element(
        self, filename, parent, is_folder, image_path, thumbnail_path, image_hash
    ):
        sql = f"INSERT INTO {config.DATABASE_NAME}.{config.ELEMENT_TABLE_NAME} ( parent, filename, is_folder, image_raw, image_thumbnail, image_hash) VALUES(%s, %s, %s, %s, %s, %s)"
        val = (parent, filename, is_folder, image_path, thumbnail_path, image_hash)

        self.cursor.execute(sql, val)

    def commit_change(self):
        self.database.commit()

    def close_database(self):
        self.database.close()
