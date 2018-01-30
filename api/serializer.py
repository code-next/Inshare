from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('pk', 'email', 'password', 'first_name', 'last_name')
        read_only_fields = ('pk',)
