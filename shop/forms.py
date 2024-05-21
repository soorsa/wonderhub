from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from .models import *
from PIL import Image




class checkoutform(forms.ModelForm):
	full_name= forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Full Name', 'class': 'checkout-form'}))
	phone_number= forms.CharField(widget=forms.NumberInput(attrs={'placeholder': 'Phone number', 'class': 'checkout-form'}))

	email= forms.EmailField(widget=forms.EmailInput(attrs={'placeholder': 'Email Address', 'class': 'checkout-form'}))
	state= forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'State or City', 'class': 'checkout-form'}))
	lga= forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Local Govt Area', 'class': 'checkout-form'}))
	delivery_address= forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Delivery Address', 'class': 'checkout-form'}))


	class Meta:
		model = Cart
		fields = ['full_name', 'phone_number', 'email', 'state', 'lga', 'delivery_address']




