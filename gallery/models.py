from django.db import models
from django.contrib.auth.models import User
from imagekit.models import ImageSpecField
from imagekit.processors import ResizeToFill

# Create your models here.


class Photo(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='media')
    image_thumb = ImageSpecField(source='image',
                                 processors=[ResizeToFill(200, 200)],
                                 format='JPEG',
                                 options={'quality': 60})
    date = models.DateField()

