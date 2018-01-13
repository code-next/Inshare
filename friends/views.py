from django.shortcuts import render
from rest_framework import permissions, generics
from .models import Friend
from .serializers import FriendRequestSerializer
from rest_framework.response import Response
from rest_framework import validators


# Create your views here.

class FriendRequestView(generics.ListCreateAPIView):
    queryset = Friend.objects.all()
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = FriendRequestSerializer

    def list(self, request, *args, **kwargs):
        queryset = Friend.objects.filter(user=self.request.user)
        serializer = FriendRequestSerializer(queryset, many=True)
        return Response(serializer.data)

    def perform_create(self, serializer):
        query = Friend.objects.filter(user=self.request.user).filter(friend=self.request.data['friend'])
        if query.exists():
            raise validators.ValidationError("You are already connected/request send")
        serializer.save(user=self.request.user)
