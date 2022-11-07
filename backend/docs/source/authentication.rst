Authentication
==========================

This project uses a token based authentication system. When a user logs in, he gets a token that can be added to headers with `Authorization: "Token 6c3553912af1b3459be7c1d5833301df1c69f612"`.
This token has an infinite lifespan, until user requests a logout.

For developpement purposes, please visit `/api/v1/endpoints`. This allows to try each routes.

Register
----------------

For register, user must send an `username`, an `email` and a `password`. `email` and `username` must be unique.
If this information is correct, user will receive a email validation link to continue and be able to login.


**Register : Succes request example**

.. code-block:: json

    {
        "status": 200,
        "message": "Please check you mailbox to confirm you registration",
        "error": false,
        "pagination": false,
    }

**Register : Bad request example**

.. code-block:: json

    {

        "status": 400,
        "message": "Your request can't be perfomed",
        "error": true,
        "pagination": false,
        "body": {
            "username": [
                "user with this username already exists."
            ],
            "email": [
                "user with this email address already exists."
            ]
        }

    }


Login
------------

When user has registered and confirmed his email, he can login. Login can be done with : `username` / `password` or `email` / `password`. 

**Login : Succes request example**

.. code-block:: json

    {

        "status": 200,
        "message": "Successfully logged in",
        "error": false,
        "pagination": false,
        "body": {
            "token": "6c3553912af1b3459be7c1d5833301df1c69f612"
        }

    }

**Login : Bad request example**

.. code-block:: json

    {

        "status": 400,
        "message": "Your request can't be perfomed",
        "error": true,
        "pagination": false,
        "body": {
            "non_field_errors": [
                "Unable to log in with provided credentials."
            ]
        }

    }


Logout
------------

When a user requests a logout, authentication token will be removed.

**Logout : Succes request example**

.. code-block:: json

    {
        "status": 200,
        "message": "Successfully logged out",
        "error": false,
        "pagination": false,}
    }
