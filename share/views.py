from django.shortcuts import render
from rest_framework import generics,permissions
from .serializers import SharedImageSerializer
from gallery.models import Tags,Photo
from rest_framework.response import Response
# Create your views here.


class SharedImageListView(generics.ListAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = SharedImageSerializer

    def list(self, request, *args, **kwargs):
        queryset = Tags.objects.filter(tag=request.user,is_user=True)
        serializer = SharedImageSerializer(queryset, many=True)
        return Response(serializer.data)