Django API Bootstrap with Authentication
=========================

Django Rest Framework API bootstrap with token authentication features,
auto generated API documentation and administration panel.

Installation
-------

This project was created with `python3.10.6`.


### Create a python virtual environment
```python3 -m venv ENV_NAME```

### Load virtual environment
```source ENV_NAME/bin/activate```

### Install requirements
```pip install -r requirements.txt```

### Prepare Database migrations
```./manage.py makemigrations```

### Migrate Database
```./manage.py migrate```

### Create Admin user
 ```./manage.py createsuperuser```

### Lauch Dev server
```./manage.py runserver```

### Set SMTP informations
It requires to set mail informations in `settings.py`, it allows application to send link during register or password reset process.

```
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = "smtp.gmail.com"
EMAIL_HOST_USER = "example@gmail.com"
EMAIL_HOST_PASSWORD = "apikey"
EMAIL_PORT = 587
EMAIL_USE_TLS = True
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER
```

Documentation
------

This project uses readthedocs template to manage documentation. You can see it in `docs` folder. Please visit https://readthedocs.org/ for more information.

When dev server is lauched, visit http://localhost:8000/api/v1/endpoints/ to access endpoints utilities.


Routes
-------

- Login
- Logout
- Register
- Password Reset
- Password Update
- Email Validation
- Profile
- Deactivate account

Responses
-------

Routes reponses have a generic json struct, with `status`, `message`, `error`, `body`, `pagination`. 

Login response success example : 
```
{
    "status": 200,
    "message": "Successfully logged in",
    "error": false,
    "pagination": false,
    "body": {
        "token": "6c3553912af1b3459be7c1d5833301df1c69f612"
    }
}
```

Pagination
-------

Resources are paginated if a list of more than 50 items is returned, you can configure pagination in `settings.py`

List response success pagination example
```
{
    "status": 200,
    "message": "",
    "error": false,
    "pagination: true",
    "page_count": 3,
    "next": "http://nexturl"
    "previous": "http://prevurl"
    "body": {
        [{}, {}, {}, {}, {}]
    }

}
```

Errors
-------

If an error occurs during a form validation, `error` is set to `true` and `body` contains error details for each field.


Register response error example
```
{
    "status": 400,
    "message": "Your request can't be perfomed",
    "error": true,
    "pagination: false",
    "body": {
        "email": [
            "Email is already used"
        ],
        "password": [
            "Password must contains a special character",
            "Password is too short "
        ],
    }
}
```


Administration
-------
When dev server is lauched, visit http://localhost:8000/admin/

Requirements
-----
django, djangorestframework, coreapi, coreapi-cli, pyyaml
