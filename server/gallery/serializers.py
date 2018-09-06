from rest_framework import serializers
from django.conf import settings
from .models import Photo


# serializer classes goes here


class PhotoSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField('get_the_image_url')

    def get_the_image_url(self, obj):
        return '%s%s' % (settings.MEDIA_URL,obj.image_thumbnail.url)

    class Meta:
        model = Photo
        fields = ['id', 'image', 'created_at','image_url']
        read_only_fields = ('id', 'created_at','image_url',)
        extra_kwargs = {
            "image": {"write_only": True}
        }



class PhotoThumbListSerializer(serializers.ModelSerializer):

    thumbnail_url = serializers.SerializerMethodField('get_the_thumbnail_url')

    def get_the_thumbnail_url(self, obj):
        return '%s' % (obj.image_thumbnail.url)

    class Meta:
        model = Photo
        fields = ['id', 'thumbnail_url', 'created_at']
        read_only_fields = ('id', 'thumbnail_url', 'created_at',)



class RealImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = ['image', 'created_at']


class PhotoDeleteSerialzer(serializers.ModelSerializer):
    model = Photo
