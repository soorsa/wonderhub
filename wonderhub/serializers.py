from typing import Any, AnyStr
from django.forms import CharField
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = "__all__"

class InstructorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instructor
        fields = "__all__"

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields ='__all__'

class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model= Lesson
        fields='__all__'