from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class Person(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_pic = models.ImageField(null=True)
    def __str__(self):
        return str(self.user.first_name)