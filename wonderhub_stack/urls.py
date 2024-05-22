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
from django.contrib import admin
from django.contrib.auth import views as auth_views
from django.conf.urls.static import static
from django.urls import path, include
from django.conf import settings
from django.contrib.staticfiles.urls import staticfiles_urlpatterns


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('wonderhub.urls')),
    path('blog/', include('blog.urls')),
    path('shop/', include('shop.urls')),
    path('user/', include('users.urls')),
    path('nimic/', include('nimic.urls')),
    path('login/', auth_views.LoginView.as_view(template_name='wonderhub/login.html'), name = 'login'),
    path('logout/', auth_views.LogoutView.as_view(template_name='wonderhub/logout.html'), name = 'logout')


]
render = True
if render:
    urlpatterns += staticfiles_urlpatterns()
else:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
