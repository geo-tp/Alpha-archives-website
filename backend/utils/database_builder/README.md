Database builder for Alpha Archive
==============================

It build the database for alpha archive website from [Alpha Project Archive](https://github.com/The-Alpha-Project/Alpha-Project-Archive). you need to clone it into `backend/media/`

Installation
-----------

Created with `pyton 3.10.6`
Dependencies are stored into the general `requirement.txt` from `backend/`

How to use
-----------

Set path and other informations to `config.py`.
run `python main.py`

It will generate hash, thumbnail, filepath, filetype, parent and save it into File table

backend/file/models.py
```
class File(models.Model):
    parent = models.CharField(max_length=1024)
    filename = models.CharField(max_length=1024)
    is_folder = models.BooleanField(default=False)
    image_raw = models.ImageField(blank=True, null=True, max_length=4096)
    image_thumbnail = models.ImageField(blank=True, null=True)
    image_hash = models.CharField(max_length=256, blank=True, null=True)
```