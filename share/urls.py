from django.urls import path

from .views import SharedImageListView,FriendsListView

urlpatterns = [
    path('get-shared-img/', SharedImageListView.as_view(), name="get-share"),
    path('get-friends/', FriendsListView.as_view(), name="get-friends"),
]
