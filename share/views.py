from django.shortcuts import render
from rest_framework import generics,permissions
from .serializers import SharedImageSerializer, FriendSerializer
from gallery.models import Tags,Photo
from rest_framework.response import Response
from django.contrib.auth.models import User
# Create your views here. hello


class SharedImageListView(generics.ListAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = SharedImageSerializer

    def list(self, request, *args, **kwargs):
        queryset = Tags.objects.filter(tag=self.request.user.pk,is_user=True)
        serializer = SharedImageSerializer(queryset, many=True)
        return Response(serializer.data)


class FriendsListView(generics.ListAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = FriendSerializer
    queryset = User.objects.all()