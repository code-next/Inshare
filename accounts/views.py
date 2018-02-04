from django.contrib.auth.models import User
from rest_framework import generics, permissions,parsers
from .serializers import UserCreateSerializer,ProfilePictureSerializer


# Create your views here.


class UserCreateView(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset = User.objects.all()
    serializer_class = UserCreateSerializer

# class UserLoginView(views.APIView):
#     permission_classes = (permissions.AllowAny,)
#     serializer_class = UserLoginSerializer
#
#     def post(self, request, *args, **kwargs):
#         try:
#             if request.user.auth_token:
#                 request.user.auth_token.delete()
#         except :
#             pass
#         data = request.data
#         serializer = UserLoginSerializer(data=data)
#         if serializer.is_valid(raise_exception=True):
#             new_data = serializer.data
#             return Response(new_data, status=HTTP_200_OK)
#         return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


class ProfilePictureView(generics.CreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = ProfilePictureSerializer
    parser_classes = (parsers.FormParser,parsers.MultiPartParser,)