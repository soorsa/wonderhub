from itertools import product
from unicodedata import category
from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
import profile
from django.shortcuts import render, redirect, reverse, get_object_or_404
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.http import HttpResponse, JsonResponse
from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView, FormView, View
from django.contrib.auth.models import User
from django.db.models import Q
from .forms import *
from .models import *
from .serializers import *
from django.urls import reverse
import json


# Create your views here.

def blog(request):
    context = {
        'posts': Post.objects.all(),
        'category': Category.objects.all()
    }

    return render(request, 'blog/blog-post.html', context)

def categoryfilter(request, title):
    catfilter = get_object_or_404(Category, title=title)
    context = {
        'catfilter': catfilter,
        'posts': Post.objects.filter(category= catfilter),
        'category': Category.objects.all()
    }

    return render(request, 'blog/category-post.html', context)

def searchpost(request):
    search_post = request.GET.get('search')
    if search_post:
        posts = Post.objects.filter(Q(title__icontains=search_post) | Q(content__icontains=search_post))
    else:
        posts= Post.objects.all()
    context = {
        'category': Category.objects.all(),
        'posts': posts,
    }
    return render(request, 'blog/search-results.html', context)
def postdetail(request, pk):
    post = get_object_or_404(Post, pk=pk)
    comments = post.comments.all()
    category = Category.objects.all()
    post.views += 1
    post.save()

    context = {
        'post': post,
        'comments': comments,
        'category': category
    }

    return render(request, 'blog/post-detail.html', context)

from django.views.decorators.csrf import csrf_exempt
@csrf_exempt
def postcomment(request, pk):
    post = get_object_or_404(Post, pk=pk)
    data = json.loads(request.body)
    if not data.get('comment'):
        return JsonResponse({'status': 'erorr', 'content':'Empty'})
    else:
    
        name = data.get('name')
        email = data.get('email')
        content = data.get('comment')

        comment = Comments.objects.create(name=name, email=email, content=content, post=post)
        return JsonResponse({'status':'success', 'name': comment.name, 'comment': comment.content, 'post': comment.post.title})

from django.views.decorators.csrf import csrf_exempt
@csrf_exempt
def likepost(request, pk):
    post = get_object_or_404(Post, pk=pk)
    post.likes += 1
    post.save()

    msg = {
        'post': post.title,
        'likes': post.likes
    }

    return JsonResponse(msg, safe=False)


# REST API SECTION
'''
class PostList(APIView):
    def get(self, request, format=None):
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)

class PostDetailApi(APIView):
    def get_object(request, pk):
        post = get_object_or_404(Post, pk=pk)
        serializer = PostSerializer(post)
        comments = post.comments.all()
        category = Category.objects.all()
        post.views += 1
        post.save()
        return Response(serializer.data)

'''


@api_view(['GET'])
def postList(request):
    posts = Post.objects.all()
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def CategoryList(request):
    category = Category.objects.all()
    serializers = CategorySerializer(category, many=True)
    return Response(serializers.data)


@api_view(['GET'])
def postDetail(request, pk):
    post = get_object_or_404(Post, pk=pk)
    comments = post.comments.all()
    post.views += 1
    post.save()
    serializers = PostSerializer(post, many=False)
    return Response(serializers.data)

@api_view(['GET'])
def comments(request, pk):
    post = get_object_or_404(Post, pk=pk)
    comments = post.comments.all()
    serializers = CommentSerializer(comments, many=True)
    return Response(serializers.data)
# FRONTEND


def frontendPostList(request):
    return render(request, 'blog/frontend-postlist.html')


def frontendDetail(request):
    return render(request, 'blog/frontend-detail.html')
