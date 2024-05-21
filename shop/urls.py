from django.urls import path, include
from django.contrib.auth import views as auth_views
from .views import *
from .  import views


urlpatterns = [
    path("", views.store, name="store"),
	path("category/<str:title>", views.categoryfilter, name='shop-category-filter'),
	path("brand/<str:title>", views.brandfilter, name='shop-brand-filter'),

    path('updatecart/', views.updateCart),
    path('updatequantity/', views.updateQuantity),


    path("admincart", views.admincartview, name="staff-cart"),
	path("admincart/<str:cart_id>", views.admincartdetail, name='staff-detail'),
	path("cart/checkout", views.checkout, name="checkout"),
	path("cart/checkout/payment", views.pay, name="payment"),
	path('cart/checkout/connfirm/payment', views.payment, name='confirm-payment'),
    path('cart', views.cart, name="cart"),
    path('orderhistory', views.orderHistory, name="history"),
	path('search', views.productsearch, name="product-search"),
	path("product/<str:product_id>", views.productdetail, name='product-detail')

	
]