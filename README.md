BACKEND
-------

- Create Python virtual env and run ```pip install -r requirements.txt```
- Create a mysql database named ```alpha_archives```
- You need to clone Alpha-Project-Archives in ```/media/``` folder
- Go to ```database_builder``` folder and run ```python main.py``` to build elements and create thumbnails
- To run server ```python manage.py runserver```
- Go to ```automated_update``` folder, you can automate cron job for updating Alpha-Project-Archive and rebuild database with ```python main.py```

FRONTEND
--------

- Run ```npm install``` to install dependencies
- Run ```npm start```
