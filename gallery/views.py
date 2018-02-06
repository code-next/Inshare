from rest_framework import generics, permissions
from rest_framework.response import Response
from .tasks import get_encodings_and_compare_with_friends

from .models import Photo
from .permissions import IsOwnerOrDenided
from .serializers import PhotoSerializer, PhotoThumbListSerializer, PhotoDeleteSerialzer
from .tasks import generate_image_thumbnails
from rest_framework import parsers
# Create your views here.


class PhotoUploadView(generics.CreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    parser_classes = (parsers.FormParser,parsers.MultiPartParser, parsers.FileUploadParser)
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer

    def perform_create(self, serializer):
        photo = serializer.save(owner=self.request.user)
        generate_image_thumbnails.delay(photo.pk)
        get_encodings_and_compare_with_friends.delay(photo.pk)



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
