from django.urls import path
from .views import PhotoUploadView
urlpatterns = [
    path('upload/', PhotoUploadView.as_view(), name="upload"),
]