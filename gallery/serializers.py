from rest_framework import serializers
from .models import Photo
# serializer classes goes here


class PhotoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Photo
        fields = ['image', 'date']
        extra_kwargs = {
            "date": {"read_only": True}  # password cannot be written from the endpoint
        }
