import email
from email.policy import default
from tabnanny import verbose
from django.db import models
from django.db.models.signals import pre_save, post_save
from django.contrib.auth.models import User
from django.utils.text import slugify
from ckeditor.fields import RichTextField
from PIL import Image
from random import randint
import uuid


# Create your models here.
class Category(models.Model):
    title = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.title


class Post(models.Model):
    title = models.CharField(max_length=50, blank=True, null=True)
    author = models.ForeignKey(
        User, on_delete=models.CASCADE, blank=True, null=True)
    category = models.ManyToManyField(Category)
    content = RichTextField(blank=True, null=True)
    embed = models.URLField(blank=True, null=True)
    image = models.ImageField(default='default.jpg', blank=True, null=True)
    views = models.PositiveIntegerField(default=0)
    likes = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.title

    @property
    def authorname(self):
        name = self.author.username
        return name

    @property
    def categoryname(self):
        cat = self.category.all()
        for ctg in cat:
            name = ctg.title
        return name


class Comments(models.Model):
    post = models.ForeignKey(
        Post, related_name='comments', on_delete=models.CASCADE, blank=True, null=True)
    name = models.CharField(max_length=30, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    content = models.TextField(max_length=10000, blank=True, null=True)

    class Meta:
        ordering = ['-id']

    def __str__(self):
        return self.name or ''
