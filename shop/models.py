from unittest.util import _MAX_LENGTH
from django.db import models
from django.db.models.signals import pre_save, post_save
from django.contrib.auth.models import User
from django.shortcuts import reverse
from django.urls import reverse
from django.utils.text import slugify
from PIL import Image
from random import randint
import uuid

# Create your models here.

class Category(models.Model):
	"""docstring for ClassName"""
	title = models.CharField(max_length=20, blank=True, null=True)
	image = models.ImageField(blank=True, null=True )

	def __str__(self):
		return self.title

class Brand(models.Model):
	"""docstring for ClassName"""
	title = models.CharField(max_length=20, blank=True,null=True)
	image = models.ImageField(blank =True, null= True)

	def __str__(self):
		return self.title
		
		
class Tag(models.Model):
	"""docstring for ClassName"""
	title = models.CharField(max_length=10, blank=True, null= True)

	def __str__(self):
		return self.title
		

class Product(models.Model):
	"""docstring for ClassName"""
	title = models.CharField(max_length=100, blank=True, null=True)
	product_id = models.UUIDField(default=uuid.uuid4, primary_key=True, unique=True, editable=False)
	is_featured = models.BooleanField(default=False)
	category = models.ForeignKey(Category, on_delete=models.CASCADE)
	brand = models.ForeignKey(Brand, on_delete=models.CASCADE)
	tag = models.ForeignKey(Tag, on_delete=models.CASCADE)
	price = models.FloatField(blank=True, null=True)
	quantity = models.PositiveIntegerField(default=0)
	description = models.TextField(blank=True, null=True)
	image = models.ImageField(upload_to='product_img', blank=True, null=True )
	image2 = models.ImageField(upload_to='product_img', blank=True, null=True )
	image3 = models.ImageField(upload_to='product_img', blank=True, null=True )


	def __str__(self):
		return self.title



class Cart(models.Model):
	"""docstring for ClassName"""
	customer = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
	ordered = models.BooleanField(default=False)
	order_completed = models.BooleanField(default=False)
	cart_id = models.UUIDField(default=uuid.uuid4, primary_key=True, unique=True, editable=False)
	device_id = models.CharField(max_length=100, null=True, blank=True)
	full_name = models.CharField(max_length=300, null=True, blank=True)
	email = models.EmailField(blank=True, null=True)
	phone_number = models.CharField(max_length=20, null=True, blank=True)
	state = models.CharField(max_length = 100, null=True, blank=True)
	lga = models.CharField(max_length=100, null=True, blank=True)
	delivery_address = models.CharField(max_length=500, blank=True,null=True)

	def __str__(self):
		if self.full_name:
			name = self.full_name 
		elif self.customer:
			name = self.customer
		else:
			name = self.device_id
		return f" {name}'s cart "

	@property
	def grandtotal(self):
		cartitems = self.cartitems.all()
		total = sum([item.subtotal for item in cartitems])
		return total
	
	@property
	def cartquantity(self):
		cartitems = self.cartitems.all()
		total = sum([item.quantity for item in cartitems])
		return total
	
	


class CartItems(models.Model):
	"""docstring for CartItem"""
	cart = models.ForeignKey(Cart, related_name='cartitems', on_delete=models.CASCADE)
	product = models.ForeignKey(Product, on_delete=models.CASCADE)
	quantity = models.PositiveIntegerField(default=0)

	def __str__(self):
		return f"{ self.cart}'s cart {self.product} "
		
	@property
	def subtotal(self):
		total = self.quantity * self.product.price
		return total
	
