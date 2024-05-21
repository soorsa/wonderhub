from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import render, redirect, reverse, get_object_or_404
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.http import HttpResponse, JsonResponse
from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView, FormView, View
from django.contrib.auth.models import User
from django.db.models import Q
from .models import *
from .serializers import *
from django.urls import reverse
import json


# Create your views here.
@api_view(['GET'])
def comicList(request):
    if request.method == 'GET':
        comics = Comic.objects.all()
        serializer = ComicSerializer(comics, many=True)
        return Response(serializer.data)
    
@api_view(['GET'])
def comicEpisodes(request, comic_id):
    try:
        comic = Comic.objects.get(comic_id=comic_id)
    except Comic.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        comic_episode = comic.episode.all()
        serializer = EpisodeSerializer(comic_episode, many=True)
        return Response(serializer.data)

@api_view(['GET'])
def EpisodeUpload(request, episode_id):
    try:
        episode = Episode.objects.get(episode_id=episode_id)
    except Episode.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        episode_upload = episode.uploads.all()
        serializer = EpisodeSerializer(episode_upload, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def categoryList(request):
    if request.method == 'GET':
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)
    
@api_view(['GET'])
def comicByCategory(request, title):
    try:
        category = Category.objects.get(title=title)
    except Category.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        comic_by_cat = Comic.objects.filter(category=category)
        serializer = ComicSerializer(comic_by_cat, many=True)
        return Response(serializer.data)

def index(request):
    if request.user.is_authenticated:
        user = request.user
        profile = Profile.get_or_create(user=user)
    else:
        profile = None

    context ={
        'profile':profile,
    }
    return render(request, 'nimic/index.html', context)
def episodes(request, comic_id):
    if request.user.is_authenticated:
        user = request.user
        profile = Profile.get_or_create(user=user)
    else:
        profile = None

    comic = Comic.objects.get(comic_id=comic_id)
    episodes = comic.episode.all()
    context = {
        "comic":comic,
        'episodes':episodes,
        'profile':profile,
    }
    return render(request, 'nimic/episodes.html', context)