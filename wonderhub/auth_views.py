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


# REGISTRATION VIEWS.
def studentRegisteration(request):
    if request.method == 'POST':
        form = StudentRegisterForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            first_name = form.cleaned_data.get('first_name')
            last_name = form.cleaned_data.get('last_name')
            phone = form.cleaned_data.get('phone_number')
            user = get_object_or_404(User, username=username)
            user.is_active = False
            user.save()
            student = Student.objects.create(student=user, full_name=first_name +" "+ last_name, phone_number=phone)
            # return HttpResponse(' <div style=" background: radial-gradient(#1b0c20, gray) ; height: 100vh; width:100%; display:flex; justify-content:center;" > <div style="background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));backdrop-filter: blur(5px); width:80%; text-align:center; border-radius:10px; margin-top:150px; height:fit-content;" > <div style="padding-top:50px;padding-bottom:50px;"> <h2 style="color:green;"> Registered successfully... </h2><p style="color:white;"> We have sent an activation link to your email. Please head to your email to activate your account. </p> </div> </div> </div> ')

            messages.success(request, username + "account created successfully")
            return redirect('login ')

    else:
        form = StudentRegisterForm(request.POST)
    return render(request, 'wonderhub/student-register.html', {'form': form})

def becomeInstructorPage(request):
    return render(request, 'wonderhub/become-instructor.html')

def instructorRegisteration(request):
    if request.method == 'POST':
        form = InstructorRegisterForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            first_name = form.cleaned_data.get('first_name')
            last_name = form.cleaned_data.get('last_name')
            phone = form.cleaned_data.get('phone_number')
            user = get_object_or_404(User, username=username)
            user.is_active = False
            user.save()
            instructor = Instructor.objects.create(instructor=user, full_name=first_name +" "+ last_name, phone_number=phone)
            # return HttpResponse('<div style=" background: radial-gradient(#1b0c20, gray) ; height: 100vh; width:100%; display:flex; justify-content:center;" > <div style="background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));backdrop-filter: blur(5px); width:80%; text-align:center; border-radius:10px; margin-top:150px; height:fit-content;" > <div style="padding-top:50px;padding-bottom:50px;"> <h2 style="color:red;"> Registered successfully... </h2><p style="color:white;"> We have sent an activation email to your email, Please head to your email to activate your account </p> </div> </div> </div>')

            messages.success(request, username + 'account created successfully')
            return redirect('login')

    else:
        form = InstructorRegisterForm(request.POST)
    return render(request, 'wonderhub/instructor-register.html', {'form': form})

@api_view(['GET'])
def allStudentAPI(request):
    users = User.objects.all()
    serializer = StudentSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def allInstructorAPI(request):
    users = User.objects.all()
    serializer = InstructorSerializer(users, many=True)
    return Response(serializer.data)

def UsernameChecker(request):
    data = json.loads(request.body)
    username = data['username']

    if not str(username).isalnum():
        return JsonResponse({'username_error': 'username can only contain letters(A-Z) and numbers(0-9)'}, status=400)
    if len(username) < 3:
        return JsonResponse({'username_error': 'username must be atleat 3 char long'}, status=400)
    if User.objects.filter(username=username).exists():
        return JsonResponse({'username_error': 'oops!... username already taken'}, status=409)
    return JsonResponse({'username_valid': True})

def EmailChecker(request):
    data = json.loads(request.body)
    email = data['email']

    if not validate_email(email):
        return JsonResponse({'email_error': 'oops... invalid email'}, status=400)
    if User.objects.filter(email=email).exists():
        return JsonResponse({'email_error': 'oops!... email already exists'}, status=409)
    return JsonResponse({'email_valid': True})