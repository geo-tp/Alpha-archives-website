from rest_framework.authentication import TokenAuthentication
from authentication.models import AuthToken


class CustomTokenAuthentication(TokenAuthentication):
    model = AuthToken
