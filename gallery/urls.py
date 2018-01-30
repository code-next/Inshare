from django.urls import path

from .views import PhotoUploadView, PhotoThumbListView, PhotoDeleteView

urlpatterns = [
    path('upload/', PhotoUploadView.as_view(), name="upload"),
    path('user_images_thumbs/', PhotoThumbListView.as_view(), name="get_thumbs"),
    path('<int:pk>/delete/', PhotoDeleteView.as_view(), name="delete"),
]
