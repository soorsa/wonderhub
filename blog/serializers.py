from pyexpat import model
from typing import Any, AnyStr
from unicodedata import category
from django.forms import CharField
from rest_framework import serializers
from .models import *

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"

class PostSerializer(serializers.ModelSerializer):
    author = serializers.CharField(source="author.username")
    category = serializers.SlugRelatedField(slug_field="title", many=True, read_only=True)
    class Meta:
        model = Post
        fields = "__all__"

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = "__all__"