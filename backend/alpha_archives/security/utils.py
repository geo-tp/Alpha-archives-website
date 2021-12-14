from psutil import disk_usage


def is_hdd_full():
    hdd = disk_usage('/')

    # less than 5go left
    if hdd.free / (2**30) < 10:
        return True

    return False

