from django.contrib import admin
from django.contrib.auth import views as auth_views
from django.conf.urls.static import static
from django.urls import path, include
from django.conf import settings
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django_hosts import patterns, host

host_patterns = patterns(
    '',
    host(r'www', 'wonderhub_stack.urls', name='www'),
    host(r'academy', 'blog.urls', name='academy'),
)
# if settings.RENDER:
#     urlpatterns += staticfiles_urlpatterns()
