from django.contrib.auth.models import User
from django.db import models


# Create your models here.


class Person(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    profile_pic = models.ImageField(null=True,)
    face_encodings = models.BinaryField(null=True)

    def __str__(self):
        return str(self.user.first_name)
