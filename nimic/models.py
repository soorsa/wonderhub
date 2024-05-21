from django.db import models
from django.db.models.signals import pre_save, post_save
from django.contrib.auth.models import User
from django.utils import timezone
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

class Profile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    image = models.ImageField(default='default.jpg', blank=True, null=True, upload_to="profile_pics")
    is_subscribed = models.BooleanField(default=False)

    def __str__(self):
        return self.name
    
class Comic(models.Model):
    title = models.CharField(max_length=50, blank=True, null=True)
    author =  models.CharField(max_length=50, blank=True, null=True)
    category = models.ManyToManyField(Category)
    tag = models.CharField(max_length=20, blank=True, null=True)
    image = models.ImageField(default='default.jpg', blank=True, null=True, upload_to="comics")
    description = models.CharField(max_length=500, blank=True, null=True)
    date_posted = models.DateTimeField(default=timezone.now)
    date_updated = models.DateTimeField(auto_now_add=True)
    comic_id = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)

    def __str__(self):
        return self.title

class Episode(models.Model):
    comic = models.ForeignKey(Comic, related_name='episode', on_delete=models.CASCADE, blank=True, null=True)
    title = models.CharField(max_length=50, blank=True, null=True)
    number = models.PositiveIntegerField(blank=True, null=True)
    is_free = models.BooleanField(default=True)
    image = models.ImageField(default='default.jpg', blank=True, null=True, upload_to="comics")
    description = models.CharField(max_length=500, blank=True, null=True)
    date_posted = models.DateTimeField(default=timezone.now)
    date_updated = models.DateTimeField(auto_now_add=True)
    episode_id = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)

    def __str__(self):
        return f" Ep {self.number} - {self.title} ({self.comic}) "

class EpisodeUpload(models.Model):
    episode = models.ForeignKey(Episode,related_name='uploads', on_delete=models.CASCADE, blank=True, null=True)
    image = models.ImageField(default='default.jpg', blank=True, null=True, upload_to="comics/uploads")
    date_posted = models.DateTimeField(default=timezone.now)
    date_updated = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f" Ep {self.episode.number} - {self.episode.title} upload ({self.comic}) "
