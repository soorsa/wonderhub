"""wonderhub_stack URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from fileinput import hook_encoded
from django.urls import path
from . import views

urlpatterns = [
    path('', views.blog, name='blog-home'),
    path('post', views.frontendPostList, name='frontend-post-list'),
    path('post/<int:pk>', views.postdetail, name='post-detail'),
    path('post/<str:title>', views.categoryfilter, name='blog-category-filter'),
    path('search', views.searchpost, name="post-search"),

    path('post/<int:pk>/comment', views.postcomment, name='post-comment'),

    path('post/<int:pk>/like', views.likepost, name='like-post'),
    #    path('api/postlist', views.PostList.as_view()),
    path('api/postlist', views.postList, name='api-postlist'),
    path('api/catlist', views.CategoryList, name='api-categorylist'),
    path('api/post/<int:pk>', views.postDetail, name='api-postdetail'),
    path('api/post/<int:pk>/comment', views.comments, name='api-comments'),
]
