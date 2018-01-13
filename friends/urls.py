from django.urls import path
from .views import FriendRequestView
urlpatterns = [
    path('friend_request/', FriendRequestView.as_view(), name="friend_request"),

]