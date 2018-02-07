from rest_framework import serializers
from gallery.models import Tags,Photo





class SharedImageSerializer(serializers.ModelSerializer):
    image_thumbnail = serializers.CharField(max_length=800)
    owner = serializers.IntegerField()
    class Meta:
        model=Tags
        fields=('photo',)
