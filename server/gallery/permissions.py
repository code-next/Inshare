from rest_framework import permissions


# custom permissions are here


class IsOwnerOrDenided(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user == obj.owner:
            return True
        else:
            return False
