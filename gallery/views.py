from rest_framework import generics, permissions
from rest_framework.response import Response

from .models import Photo
from .permissions import IsOwnerOrDenided
from .serializers import PhotoSerializer, PhotoThumbListSerializer, PhotoDeleteSerialzer
from .tasks import generate_image_thumbnails

# Create your views here.


class PhotoUploadView(generics.CreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer

    def perform_create(self, serializer):
        photo = serializer.save(owner=self.request.user)
        generate_image_thumbnails.delay(photo.pk)



class PhotoThumbListView(generics.ListAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Photo.objects.all()
    serializer_class = PhotoThumbListSerializer

    def list(self, request, *args, **kwargs):
        queryset = Photo.objects.filter(owner=request.user)
        serializer = PhotoThumbListSerializer(queryset, many=True)
        return Response(serializer.data)


class PhotoDeleteView(generics.DestroyAPIView):
    permission_classes = (permissions.IsAuthenticated, IsOwnerOrDenided,)
    serializer_class = PhotoDeleteSerialzer
    queryset = Photo.objects.all()
