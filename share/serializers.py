from rest_framework import serializers
from gallery.models import Tags,Photo
from accounts.models import Person
from django.contrib.auth.models import User

class UserSerailzer(serializers.ModelSerializer):
    class Meta :
        model = User
        fields = ('username')

class TrackSerializer(serializers.ModelSerializer):
    owner = UserSerailzer()
    thumbnail_url = serializers.SerializerMethodField('get_the_thumbnail_url')

    def get_the_thumbnail_url(self, obj):
        return '%s' % (obj.image_thumbnail.url)

    class Meta:
        model = Photo
        fields = ['owner', 'thumbnail_url', 'created_at']


class SharedImageSerializer(serializers.ModelSerializer):
    photo = TrackSerializer()

    class Meta:
        model=Tags
        fields=('photo','tag')


class FriendSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=('first_name','username')

