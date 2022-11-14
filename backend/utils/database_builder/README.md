Database builder for Alpha Archive
==============================

It build the database for alpha archive website from [Alpha Project Archive](https://github.com/The-Alpha-Project/Alpha-Project-Archive). you need to clone it into `backend/media/`

Installation
-----------

it was created with `pyton 3.10.6`
Dependencies are stored into the general `requirement.txt` from `backend/`

How to use
-----------

Set path and other informations to `constants.py` if needed.
run `python main.py`

It will generate hash, thumbnail, filepath, filetype, parent and save it into File model

backend/file/models.py
```
class File(models.Model):
    parent = models.CharField(max_length=1024)
    filename = models.CharField(max_length=1024)
    is_folder = models.BooleanField(default=False)

    # we use CharField, we dont want django to deal with file
    image_raw = models.CharField(max_length=1024, blank=True, null=True)

    image_thumbnail = models.ImageField(blank=True, null=True)
    image_hash = models.CharField(max_length=256, blank=True, null=True)

```