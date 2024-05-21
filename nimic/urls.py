from django.urls import path
from . import views

urlpatterns = [
    path('api/', views.comicList, name='nimic-api'),
    path('api/comic/<str:comic_id>/', views.comicEpisodes, name='comic-episodes'),
    path('api/filter/category/<str:title>/', views.comicByCategory, name='category-filter'),
    path('api/category/', views.categoryList, name='categories'),
    path('api/episode/<str:episode_id>/', views.EpisodeUpload, name='episode'),
    path('', views.index, name="index"),
    path('episodes/<str:comic_id>', views.episodes, name="episodes"),

]
