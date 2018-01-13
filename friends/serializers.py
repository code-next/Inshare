from rest_framework import serializers
from .models import Friend
# serializers goes here


class FriendRequestSerializer(serializers.ModelSerializer):

    class Meta:
        model = Friend
        fields = ['user', 'friend', 'status']
        read_only_fields = ('user', 'status', )
