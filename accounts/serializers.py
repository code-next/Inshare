from django.contrib.auth.models import User
from django.core.validators import validate_email
from rest_framework import serializers
from rest_framework_jwt.settings import api_settings

from .models import Person
from .tasks import get_encodings_from_profile_pic


# serializer classes goes here


class UserCreateSerializer(serializers.ModelSerializer):
    token = serializers.CharField(read_only=True)
    profile_pic = serializers.ImageField(write_only=True)
    class Meta:
        model = User
        fields = ["token", "first_name","profile_pic", "email", "password"]
        extra_kwargs = {
            "password": {"write_only": True}  # password cannot be viewed from the endpoint
        }

    def validate(self, attrs):
        email = attrs['email']
        user = User.objects.filter(email=email)
        if user.exists():
            raise serializers.ValidationError("User with email already exists")
        if validate_email(email):
            raise serializers.ValidationError("Please check the email")
        return attrs

    def create(self, validated_data):
        first_name = validated_data['first_name']
        email = validated_data['email']
        password = validated_data['password']
        photo = validated_data['profile_pic']
        user = User.objects.create_user(username=email, email=email, password=password, first_name=first_name)
        user.save()
        person = Person(user=user,profile_pic =photo)
        person.save()
        # get_encodings_from_profile_pic.delay(person.pk)
        # following are rest jwt settings
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
        payload = jwt_payload_handler(user)
        token = jwt_encode_handler(payload)
        validated_data['token'] = token
        return validated_data

# class UserLoginSerializer(serializers.ModelSerializer):
#     token = serializers.CharField(read_only=True)
#     username = serializers.CharField(label="email")
#     class Meta:
#         model = User
#         fields = ["token", "username", "password"]
#
#     def validate(self, attrs):
#         username = attrs.get("username",None)
#         password = attrs.get("password",None)
#         if not username and not password:
#             raise serializers.ValidationError("email/password cannot be null")
#         user = authenticate(username=username, password=password)
#         if not user:
#             raise serializers.ValidationError("Incorrect email/password")
#
#         token = Token.objects.create(user=user)
#         attrs["token"] = token
#         return attrs


# class ProfilePictureSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Person
#         fields = ['profile_pic','user']
#         read_only_fields = ('user',)
