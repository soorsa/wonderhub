from django.shortcuts import render, redirect, get_object_or_404
from .forms import UserRegisterForm
from django.contrib.auth.models import User
from .serializers import *
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
import json
from django.http import JsonResponse, HttpResponse
from validate_email import validate_email



# Create your views here.
def registeration(request):
    if request.method == 'POST':
        form = UserRegisterForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            user = get_object_or_404(User, username=username)
            user.is_active = False
            user.save()
            return HttpResponse('<h1>Registered</h1>')


    else:
        form = UserRegisterForm(request.POST)
    return render(request, 'users/register.html', {'form': form})


@api_view(['GET'])
def allUsersAPI(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

def UsernameChecker(request):
    data = json.loads(request.body)
    username = data['username']

    if not str(username).isalnum():
        return JsonResponse({'username_error': 'Username can only contain letters(A-Z) and numbers(0-9)'}, status=400)
    if len(username) < 3:
        return JsonResponse({'username_error': 'Username must be atleat 3 char long'}, status=400)
    if User.objects.filter(username=username).exists():
        return JsonResponse({'username_error': 'Ops!... username already taken'}, status=409)
    return JsonResponse({'username_valid': True})

def EmailChecker(request):
    data = json.loads(request.body)
    email = data['email']

    if not validate_email(email):
        return JsonResponse({'email_error': 'Oops... Invalid email'}, status=400)
    if User.objects.filter(email=email).exists():
        return JsonResponse({'email_error': 'O0ps!... email already exists'}, status=409)
    return JsonResponse({'email_valid': True})