from src.views import CliView
from src.controller import SortController

if __name__ == "__main__":
    view = CliView()
    controller = SortController(view)

    controller.start()
