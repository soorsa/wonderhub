from typing import Any, AnyStr
from django.forms import CharField
from rest_framework import serializers
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'username', 'first_name', 'last_name', 'email', 'is_active'
        ]

