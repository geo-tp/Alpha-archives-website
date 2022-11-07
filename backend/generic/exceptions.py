from rest_framework.views import exception_handler
from .response import format_api_response


def custom_exception_handler(exc, context):
    # Call REST framework's default exception handler first,
    # to get the standard error response.
    response = exception_handler(exc, context)

    if not response:
        return response

    if response.status_code == 500:
        response.data = {"error": "error"}
        return response

    if response.data.get("detail", 0):
        message = response.data["detail"]
        del response.data["detail"]
    else:
        message = "Your request can't be perfomed"

    if response is not None:
        body = response.data

    api_response = format_api_response(
        content=body, message=message, status=response.status_code, error=True
    )

    response.data = api_response

    return response
