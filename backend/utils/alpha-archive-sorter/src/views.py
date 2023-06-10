class CliView:
    def welcome_message(self):
        print(
            """
ALPHA ARCHIVES - AUTOSORTER
Please see config.py before running me.

I will sort the images and save the results to the root folder of this application.
After you reviewed it, I will ask your confirmation to delete original files in UNSORTED.

UNSORTED ANALYSIS : 
"""
        )

    def ask_press_enter(self):
        result = "none"
        while result != "":
            result = input("Press enter to start")

    def delete_message(self, results_path):
        print(
            """
I'm done with sorting, please see the results at :
"""
        )
        print(results_path)

        print(
            """
Tell me what you want to do after revewing the results :
DELETE : delete files from original UNSORTED folders
EXIT : quit without any modification
"""
        )

    def ask_delete_confirmation(self):
        result = ""

        while result not in ["DELETE", "EXIT"]:
            result = input("Please type : 'DELETE' OR 'EXIT': ")

        return True if result == "DELETE" else False

    def counter_message(self, counter):
        if counter % 100 == 0:
            print(counter, "images processed")

    def dict_formatted_message(self, dico):
        for key, value in dico.items():
            print(key, value)
        print("\n")
