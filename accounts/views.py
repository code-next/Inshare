from django.contrib.auth.models import User
from rest_framework import generics, permissions,parsers,response,status
from .serializers import UserCreateSerializer
from rest_framework_jwt.settings import api_settings
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK,HTTP_400_BAD_REQUEST



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

# class ProfilePictureView(generics.CreateAPIView):
#     permission_classes = (permissions.IsAuthenticated,)
#     serializer_class = ProfilePictureSerializer
#     parser_classes = (parsers.FormParser,parsers.MultiPartParser, )
#
#     def perform_create(self, serializer):
#         print(self.request.FILES['profile_pic'])
#         serializer.save(user=self.request.user)
# class UserLoginView(generics.CreateAPIView):
#     permission_classes = (permissions.AllowAny,)
#     queryset = User.objects.all()
#     serializer_class = UserLoginSerializer
#     def post(self, request, *args, **kwargs):
#         res=[]
#         username = self.request.data['username']
#         user= User.objects.get(username=username)
#         is_true = User.check_password(self,raw_password=self.request.data['password'])
#         if is_true:
#             # following are rest jwt settings
#             jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
#             jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
#             payload = jwt_payload_handler(user)
#             token = jwt_encode_handler(payload)
#             token = "JWT " + token
#             res['token'] =token
#             return Response(res,status=HTTP_200_OK)
#         else:
#             res['error']="Incorrect credentials"
#             return Response(res,status=HTTP_400_BAD_REQUEST)
