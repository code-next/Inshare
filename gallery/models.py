from django.contrib.auth.models import User
from django.db import models


# Create your models here.


class Photo(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='media')
    image_thumb = models.ImageField()
    created_at = models.DateField(auto_now_add=True)

