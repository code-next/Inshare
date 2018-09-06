from django.contrib.auth.models import User
from django.db import models


# Create your models here.


class Friend(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    friend = models.ForeignKey(User, on_delete=models.CASCADE, related_name="User_Friend_friend")
    status = models.BooleanField(default=False)

    def __str__(self):
        return str(self.user.first_name + "-" + self.friend.first_name)
