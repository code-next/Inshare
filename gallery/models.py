from django.contrib.auth.models import User
from django.db import models
from imagekit.models import ImageSpecField
from imagekit.processors import ResizeToFill

# Create your models here.


class Photo(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.ImageField()
    image_thumbnail = ImageSpecField(source='image',
                                      processors=[ResizeToFill(600, 400)],
                                      format='JPEG',
                                      options={'quality': 70})
    created_at = models.DateField(auto_now_add=True)


class Tags(models.Model):
    photo = models.ForeignKey(Photo,on_delete=models.CASCADE)
    tag = models.CharField(max_length=30)
    is_user = models.BooleanField()

