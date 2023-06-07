import config


def welcome_message():
    print(
        """
ALPHA ARCHIVES - AUTOSORTER
Please see config.py before running me.

I will sort the images and save the results to the root folder of this application.
After you reviewed it, I will ask your confirmation to delete original files in UNSORTED.

UNSORTED ANALYSIS : 
"""
    )


def ask_press_enter():
    result = "none"
    while result != "":
        result = input("Press enter to start")


def delete_message():
    print(
        """
I'm done with sorting, please see the results at :
"""
    )
    print(config.RESULTS_PATH)

    print(
        """
Tell me what you want to do after revewing the results :
DELETE : delete files from original UNSORTED folders
EXIT : quit without any modification
"""
    )


def ask_delete_confirmation():
    result = ""

    while result not in ["DELETE", "EXIT"]:
        result = input("Please type : 'DELETE' OR 'EXIT': ")

    return result


def counter_message(counter):
    if counter % 100 == 0:
        print(counter, "images processed")


def dict_formatted_message(dico):
    for key, value in dico.items():
        print(key, value)
    print("\n")
