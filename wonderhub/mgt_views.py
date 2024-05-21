from django.shortcuts import render, redirect, get_object_or_404
from .forms import *
from django.utils import timezone
from datetime import timedelta
from django.db.models import Sum, Q
from django.db.models.functions import TruncDate
from django.contrib.auth.models import User
from .serializers import *
from .filters import *
from django_filters import rest_framework as filters
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
import json
from django.http import JsonResponse, HttpResponse
from validate_email import validate_email
from django.contrib.auth.decorators import login_required, user_passes_test
from django.contrib import messages
from .models import *
from .custom_decorators import *


def adminIndex(request):
    students = Student.objects.all()
    instructors = Instructor.objects.all()
    categories = Category.objects.all()
    courses = Course.objects.all()
    context={
        'students':students,
        'instructors':instructors,
        'categories':categories,
        'courses':courses,
    }
    return render(request, "wonderhub-mgt/index.html", context)