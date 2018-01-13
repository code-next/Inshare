from django.db import models
from django.contrib.auth.models import User
# Create your models here.





class Photo(models.Model):
    owner =  models.ForeignKey(User,on_delete=models.CASCADE)
    image = models.ImageField()
    date = models.DateField()

class Tag(models.Model):
    photo = models.ForeignKey(Photo,on_delete=models.CASCADE)
    tag = models.CharField(null=True,max_length=50)
    is_user = models.BooleanField(default=False)

class Share(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    date = models.DateField()

class SharedWith(models.Model):
    share = models.ForeignKey(Share,on_delete=models.CASCADE)
    friend = models.ForeignKey(User,on_delete=models.CASCADE)

class SharedImage(models.Model):
    share = models.ForeignKey(Share,on_delete=models.CASCADE)
    photo = models.ForeignKey(Photo,on_delete=models.CASCADE)