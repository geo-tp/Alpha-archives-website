from rest_framework import permissions


class IsOwner(permissions.BasePermission):
    """
    User is ressources's owner or rejected request
    """

    def has_permission(self, request, view):
        """
        User and Request User are same for method create/update
        """
        if request.data:
            return bool(request.user.id == int(request.data["user"]))

        return True

    def has_object_permission(self, request, view, obj):
        return bool(obj.user == request.user)


class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    User is ressources's owner or read only
    """

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.user == request.user


class IsAdminAuthenticated(permissions.BasePermission):
    def has_permission(self, request, view):
        # Ne donnons l’accès qu’aux utilisateurs administrateurs authentifiés
        return bool(
            request.user and request.user.is_authenticated and request.user.is_superuser
        )


class IsAdminAuthenticatedOrReadOnly(permissions.BasePermission):
    """
    The request is authenticated as a admin user, or is a read-only request.
    """

    def has_permission(self, request, view):
        return bool(
            request.method in permissions.SAFE_METHODS
            or request.user
            and request.user.is_authenticated
            and request.user.is_superuser
        )
