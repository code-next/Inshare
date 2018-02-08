from django.urls import path

from .views import SharedImageListView

urlpatterns = [
    path('get-shared-img/', SharedImageListView.as_view(), name="get-share"),

]
