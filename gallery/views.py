from django.shortcuts import render
from rest_framework import generics,permissions
from .serializers import PhotoSerializer
from .models import Photo
# Create your views here.


class PhotoUploadView(generics.CreateAPIView):
    permission_classes = (permissions.IsAuthenticated, )
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer