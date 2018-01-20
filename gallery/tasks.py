from __future__ import absolute_import, unicode_literals

from celery import shared_task
from sorl.thumbnail import get_thumbnail
from .models import Photo
# All the tasks goes here


@shared_task()
def generate_image_thumbnails(pk):
    photo = Photo.objects.get(pk=pk)
    photo.image_thumb = get_thumbnail(photo.image, '200x200', crop='center', quality=70).url
    photo.save()
    return

