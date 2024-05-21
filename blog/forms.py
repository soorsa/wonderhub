from django import forms
from django.contrib.auth.models import User
from .models import *
from django.contrib.auth.forms import UserCreationForm



class CommentForm(forms.ModelForm):
	name = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Enter your name', 'class': 'form-comment name', 'id': 'namefield', 'name':'name'}))
	email = forms.EmailField(widget=forms.EmailInput(attrs={'placeholder': 'Enter your email address', 'class': 'form-comment email', 'name':'email'}))
	content = forms.CharField(widget=forms.TextInput(attrs={'placeholder': "What's on your mind", 'class': 'form-comment comment', 'name':'comment'}))

	class Meta:
		model = Comments
		fields = ['name', 'email', 'content', 'post']


