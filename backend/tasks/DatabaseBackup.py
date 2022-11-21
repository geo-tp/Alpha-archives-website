import mysql.connector
import subprocess
import datetime


class DatabaseBackup:
    def __init__(self, **kwargs):
        for name, value in kwargs.items():
            setattr(self, name, value)

    def connect(self):
        try:
            self.database = mysql.connector.connect(
                host=self.ip,
                port=self.port,
                user=self.user,
                password=self.password,
                database=self.database_name,
            )

            self.cursor = self.database.cursor()

        except:
            raise "Connection with Database failed"

    def disconnect(self):
        if not self.database:
            raise "Database is not even connected."

        self.cursor.close()
        self.database.close()

    def dump(self, path, filename):
        with open(path + filename, "w") as output:
            command = f"mysqldump -h {self.ip} -P {self.port} -u {self.user} -p'{self.password}' {self.database_name}"
            c = subprocess.Popen(command, stdout=output, shell=True)


if __name__ == "__main__":

    db = DatabaseBackup(
        user="root",
        password="pwd",
        ip="localhost",
        port="3306",
        database_name="alpha_archives",
    )
    db.connect()

    now = datetime.datetime.today().strftime("%Y-%m-%d")
    db.dump("/home/user/Documents/", f"alpha_archive_backup_{now}.sql")
    db.disconnect()
