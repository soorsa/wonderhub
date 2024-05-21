from pyexpat import model
from django.forms import CharField
from rest_framework import serializers
from .models import *

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"

class ComicSerializer(serializers.ModelSerializer):
    #author = serializers.CharField(source="author.username")
    category = serializers.SlugRelatedField(slug_field="title", many=True, read_only=True)
    class Meta:
        model = Comic
        fields = "__all__"

class EpisodeSerializer(serializers.ModelSerializer):
    comic = serializers.SlugRelatedField(slug_field="title", read_only=True)
    class Meta:
        model = Episode
        fields = "__all__"

class EpisodeUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = EpisodeUpload
        fields = "__all__"