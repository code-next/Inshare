import face_recognition
import numpy as np
picture_of_me = face_recognition.load_image_file("faces/obama.jpg")
my_face_encoding = face_recognition.face_encodings(picture_of_me)[0]
print(my_face_encoding)
print(type(my_face_encoding.dumps()))
print(my_face_encoding.dumps())

print(np.loads(my_face_encoding.dumps()))
# my_face_encoding now contains a universal 'encoding' of my facial features that can be compared to any other picture of a face!

unknown_picture = face_recognition.load_image_file("faces/obama2.jpg")
unknown_face_encoding = face_recognition.face_encodings(unknown_picture)[0]

# Now we can see the two face encodings are of the same person with `compare_faces`!

results = face_recognition.compare_faces([my_face_encoding], unknown_face_encoding)

if results[0] == True:
    print("It's a picture of me!")
else:
    print("It's not a picture of me!")