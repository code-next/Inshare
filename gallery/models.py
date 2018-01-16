from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class Photo(models.Model):
    owner = models.ForeignKey(User,on_delete=models.CASCADE)
    image = models.ImageField()
    date = models.DateField()
    
    def __str__(self):
        return  self.owner + "-" + self.date