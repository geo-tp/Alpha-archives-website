import subprocess
import os

ALPHA_PROJECT_ARCHIVES_DIR = "media/Alpha-Project-Archive/"
DATABASE_BUILDER = "database_builder/main.py"
GIT_UP_TO_DATE = ["Already up to date.\n", "Déjà à jour.\n"]

def get_main_working_dir():
    working_dir_list = os.getcwd().split("/")
    working_dir_list = working_dir_list[1:-1]

    return "/" + "/".join(working_dir_list) + "/"

def git_is_up_to_date(rslt):
    
    if rslt in GIT_UP_TO_DATE:
        return True

    return False

def git_pull():
    process = subprocess.Popen(
        ["git", "pull"],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE, text=True,
        cwd=get_main_working_dir()+ALPHA_PROJECT_ARCHIVES_DIR
    )

    process.wait()
    return  process.communicate()[0]

def update_database_elements():
    process = subprocess.Popen(["python3", get_main_working_dir()+DATABASE_BUILDER],stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    process.wait()

if __name__ == "__main__":

    rslt = git_pull()
    up_to_date = git_is_up_to_date(rslt)

    if not up_to_date:
        update_database_elements()

    else:
        print("Archive is up to date")

    # get_main_working_dir()