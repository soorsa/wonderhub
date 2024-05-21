from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.models import User
from django.http import JsonResponse, HttpResponse
from django.contrib.auth.decorators import login_required, user_passes_test
from .models import *

# Custom decorators

def is_student(view_func):
    def check(request, *args, **kwargs):
        if hasattr(request.user, 'student'):
            return view_func(request, *args, **kwargs)
        else:
            return redirect('instructor-dashboard')
    return check

def is_instructor(view_func):
    def check(request, *args, **kwargs):
        if hasattr(request.user, 'instructor'):
            return view_func(request, *args, **kwargs)
        else:
            return HttpResponse(' <div style=" background: radial-gradient(#1b0c20, gray) ; height: 100vh; width:100%; display:flex; justify-content:center;" > <div style="background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));backdrop-filter: blur(5px); width:80%; text-align:center; border-radius:10px; margin-top:150px; height:fit-content;" > <div style="padding-top:50px;padding-bottom:50px;"> <h2 style="color:red;"> Sorry you are not Authorized... </h2><p style="color:white;"> you do not have access to this features.</p> </div> </div> </div> ')
    return check
