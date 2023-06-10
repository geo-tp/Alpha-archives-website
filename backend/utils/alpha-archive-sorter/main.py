from src.views import CliView
from src.controller import SortController
from src.repositeries import TextRepo, ZoneRepo

if __name__ == "__main__":
    view = CliView()
    text_repo = TextRepo()
    zone_repo = ZoneRepo()
    controller = SortController(view, zone_repo=zone_repo, text_repo=text_repo)

    controller.start()
