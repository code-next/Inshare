from __future__ import absolute_import, unicode_literals
from celery import shared_task
from .models import Person
import face_recognition


@shared_task()
def get_encodings_from_profile_pic(pk):
    user = Person.objects.get(pk=pk)
    picture = user.profile_pic
    processed_pic = face_recognition.load_image_file(picture)
    face_encodings = face_recognition.face_encodings(processed_pic)[0]
    user.face_encodings = face_encodings.dumps()
    user.save()
    return