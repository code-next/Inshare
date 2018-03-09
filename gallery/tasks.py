from __future__ import absolute_import, unicode_literals

from celery import shared_task
# from sorl.thumbnail import get_thumbnail
from .models import Photo,Tags
import face_recognition
from django.apps import apps
import numpy as np
from accounts.models import Person
# All the tasks goes here

# @shared_task()
# def generate_image_thumbnails(pk):
#     photo = Photo.objects.get(pk=pk)
#     photo.image_thumb = get_thumbnail(photo.image, '600x300', crop='center', quality=70).url
#     photo.save()
#     return


@shared_task()
def get_encodings_and_compare_with_friends(pk):
    photo = Photo.objects.get(pk=pk)
    persons = Person.objects.all()
    image = face_recognition.load_image_file(photo.image)
    encodings = face_recognition.face_encodings(image)
    for encoding in encodings:
        for person in persons:
            if person.pk == photo.owner.pk:
               pass
            else:
                try:
                    person_encoding=np.loads(person.face_encodings)
                    results = face_recognition.compare_faces([encoding],person_encoding)
                    if results[0]:
                        if not Tags.objects.get(tag=person.pk,photo=photo):
                            tag = Tags(photo= photo, tag = person.pk, is_user=True)
                            tag.save()
                except:
                    print("user does not have face encodings")
    return

