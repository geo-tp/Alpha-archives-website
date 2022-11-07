def format_api_response(
    content=None,
    status=200,
    message="",
    error=False,
    pagination=False,
    next_=None,
    previous=None,
    count=None,
):
    """
    Return a formatted json api response

    :param content: Optional body of the response
    :type content: dict or None
    :param status: Optional status code of the response
    :type status: int
    :param message: Optional general message of the response
    :type message: str
    :param error: Optional: error state of the response
    :type error: bool
    :param pagination: Optional pagination state of the response
    :type pagination: bool
    :param next_: Optionnal next page url for paginated resources
    :type next_: str or None
    :param previous: Optionnal previous page url for paginated resources
    :type previous: str or None
    :param page_count: Optionnal number of pages for paginated resources
    :type page_count: int

    """
    response = {"status": status, "message": message}
    response["error"] = True if error else False

    if pagination and count:
        response["pagination"] = True
        response["next"] = next_
        response["previous"] = previous
        response["count"] = count

    else:
        response["pagination"] = False

    if content:
        response["body"] = content

    return response
