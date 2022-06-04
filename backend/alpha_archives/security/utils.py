from psutil import disk_usage
from django.conf import settings


def is_hdd_full():
    hdd = disk_usage('/')

    # less than 5go left
    if hdd.free / (2**30) < settings.DISABLE_UPLOAD_SERVER_HDD_SPACE_LEFT:
        return True

    return False

