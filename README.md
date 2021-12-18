INFORMATIONS
-----------

Website to browse and upload screenshots for Alpha Project.

- Backend folder contains Django Rest API and scripts
    - alpha-archives -> Main Django Project
    - automated_update -> Script to automate git update and rebuild DB
    - database_builder -> Script to build elements and create thumbnail from Alpha Project Archives
    - element -> Django App
    - media -> contains Alpha Project Archives, thumbnail and uploaded images
    - security -> Django App

- Frontend folder containes React App

INSTALLATION
------------

BACKEND

- Create Python virtual env and run ```pip install -r requirements.txt```
- Create a mysql database named ```alpha_archives```
- You need to clone Alpha-Project-Archives in ```/media/``` folder
- Go to ```database_builder``` folder and run ```python main.py``` to build elements and create thumbnails
- To run server ```python manage.py runserver```
- Go to ```automated_update``` folder, you can automate cron job for updating Alpha-Project-Archive and rebuild database with ```python main.py```

FRONTEND

- Run ```npm install``` to install dependencies
- Change ```API_URL``` in ```/src/utils/APIConfig.js``` with you API url like ```http://localhost:8000/```
- Run ```npm start```


DEPLOY

- Serve Django API with gunicorn
- Make react build with ```npm run build```
- Configure Nginx like this : 

```
server {
    server_name DOMAIN.COM www.DOMAIN.COM;
    root /home/YourPath/Alpha-archives-website/frontend/build;
    index index.html index.htm index.nginx-debian.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        include proxy_params;
        proxy_pass http://127.0.0.1:8000;

    }

    location /media {
        autoindex on;
        alias /home/YouPath/Alpha-archives-website/backend/media;
    }

}
```
