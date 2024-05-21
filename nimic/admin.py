from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(Comic)
admin.site.register(Category)
admin.site.register(Episode)
admin.site.register(EpisodeUpload)
admin.site.register(Profile)
