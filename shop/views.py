from django.shortcuts import render, redirect, reverse, get_object_or_404
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.http import HttpResponse, JsonResponse
from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView, FormView, View
from django.contrib.auth.models import User
from django.db.models import Q
from .forms import *
from .models import *
from django.urls import reverse
import json
# Create your views here.

'''class Home(ListView):
	model=Product
	template_name='shop/home.html'
	context_object_name = 'products'
	paginate_by = 50'''

'''def shop(request):
	if request.user.is_authenticated:
		customer = request.user
		cart,created = Cart.objects.get_or_create(customer=customer, ordered=False, order_completed= False)
		cartitems = cart.cartitems_set.all()
	else:
		cartitems = []
		cart = []
		cart = {'cartquantity': 0}

	products = Product.objects.all()
	context = {'products': products, 'cart': cart, 'cartitems': cartitems}
	return render(request, 'shop/home.html', context)'''

'''def shop(request):
    if request.user.is_authenticated:
        customer = request.user
        cart, created = Cart.objects.get_or_create(customer=customer, ordered = False, order_completed=False)
        cartitems = cart.cartitems_set.all()
    else:
        cart = []
        cartitems = []
        cart = {'cartquantity': 0}

    products = Product.objects.all()
    categorys = Category.objects.all()
    brands = Brand.objects.all()
    context = {'products': products, 'categorys': categorys, 'brands': brands, 'cart': cart, 'cartitems': cartitems}
    return render(request, 'shop/home.html', context)
'''
#MY CUSTOM VIEW
def store(request):
    if request.user.is_authenticated and request.COOKIES.get('device_id') is not None:
        customer = request.user
        device_id = request.COOKIES['device_id']
        cart, created = Cart.objects.get_or_create(customer=customer, ordered = False, order_completed=False)
        cartitems = cart.cartitems.all()
        if cart.device_id is None:
            cart.device_id = device_id
            cart.save()
        cart.save()
    elif request.COOKIES.get('device_id') is not None:
        device_id = request.COOKIES['device_id']
        cart, created = Cart.objects.get_or_create(device_id=device_id, ordered=False, order_completed=False)
        cartitems = cart.cartitems.all()
    else:
        cart = []
        cartitems = []
        cart = {'cartquantity': 0}

    products = Product.objects.all()
    categorys = Category.objects.all()
    brands = Brand.objects.all()
    context = {'products': products, 'categorys': categorys, 'brands': brands, 'cart': cart, 'cartitems': cartitems}
    return render(request, 'shop/store.html', context)


#view for custom admin
def admincartview(request):
    cart = Cart.objects.all()
    products =Product.objects.all()
    context = {'cart': cart, 'products':products}
    return render(request, 'shop/admincart.html', context)

#admin custome view detail cart
def admincartdetail(request, cart_id):
    if request.user.is_authenticated:
        cart = get_object_or_404(Cart, cart_id=cart_id)
    cart = get_object_or_404(Cart, cart_id=cart_id)
    cartitems = cart.cartitems.all()
    context ={'cart':cart, 'cartitems':cartitems}
    return render(request, 'shop/admincartdetail.html', context)

def productdetail(request, product_id):
    if request.user.is_authenticated and request.COOKIES.get('device_id') is not None:
        customer = request.user
        device_id = request.COOKIES['device_id']
        cart, created = Cart.objects.get_or_create(customer=customer, ordered = False, order_completed=False)
        cartitems = cart.cartitems.all()
        if cart.device_id is None:
            cart.device_id = device_id
            cart.save()
        cart.save()
    elif request.COOKIES.get('device_id') is not None:
        device_id = request.COOKIES['device_id']
        cart, created = Cart.objects.get_or_create(device_id=device_id, ordered=False, order_completed=False)
        cartitems = cart.cartitems.all()
    else:
        cart = []
        cartitems = []
        cart = {'cartquantity': 0}

    product= get_object_or_404(Product, product_id=product_id)
    categorys = Category.objects.all()
    brands = Brand.objects.all()
    context = {'product': product, 'cart': cart, 'cartitems': cartitems, 'categorys':categorys, 'brands':brands}
    return render(request, 'shop/productdetail.html', context)

def productsearch(request):
    search_pdt = request.GET.get('search')
    if request.user.is_authenticated and request.COOKIES.get('device_id') is not None:
        customer = request.user
        device_id = request.COOKIES['device_id']
        cart, created = Cart.objects.get_or_create(customer=customer, ordered = False, order_completed=False)
        cartitems = cart.cartitems.all()
        if cart.device_id is None:
            cart.device_id = device_id
            cart.save()
        cart.save()
    elif request.COOKIES.get('device_id') is not None:
        device_id = request.COOKIES['device_id']
        cart, created = Cart.objects.get_or_create(device_id=device_id, ordered=False, order_completed=False)
        cartitems = cart.cartitems.all()
    else:
        cart = []
        cartitems = []
        cart = {'cartquantity': 0}

    
    categorys = Category.objects.all()
    brands = Brand.objects.all()
    if search_pdt:
        products = Product.objects.filter(Q(title__icontains=search_pdt) | Q(description__icontains=search_pdt))
    else:
        products = Product.objects.all()
    context = {'products': products, 'categorys': categorys, 'brands': brands, 'cart': cart, 'cartitems': cartitems}
    return render(request, 'shop/product_search.html', context)

def categoryfilter(request, title):
    if request.user.is_authenticated and request.COOKIES.get('device_id') is not None:
        customer = request.user
        device_id = request.COOKIES['device_id']
        cart, created = Cart.objects.get_or_create(customer=customer, ordered = False, order_completed=False)
        cartitems = cart.cartitems.all()
        if cart.device_id is None:
            cart.device_id = device_id
            cart.save()
        cart.save()
    elif request.COOKIES.get('device_id') is not None:
        device_id = request.COOKIES['device_id']
        cart, created = Cart.objects.get_or_create(device_id=device_id, ordered=False, order_completed=False)
        cartitems = cart.cartitems.all()
    else:
        cart = []
        cartitems = []
        cart = {'cartquantity': 0}

    catfilter = get_object_or_404(Category, title=title)
    products = Product.objects.filter(category=catfilter)
    categorys = Category.objects.all()
    brands = Brand.objects.all()
    context = {'products': products, 'categorys': categorys, 'brands': brands, 'cart': cart, 'cartitems': cartitems, 'catfilter': catfilter}
    return render(request, 'shop/categoryfilter.html', context)


def brandfilter(request, title):
    if request.user.is_authenticated and request.COOKIES.get('device_id') is not None:
        customer = request.user
        device_id = request.COOKIES['device_id']
        cart, created = Cart.objects.get_or_create(customer=customer, ordered = False, order_completed=False)
        cartitems = cart.cartitems.all()
        if cart.device_id is None:
            cart.device_id = device_id
            cart.save()
        cart.save()
    elif request.COOKIES.get('device_id') is not None:
        device_id = request.COOKIES['device_id']
        cart, created = Cart.objects.get_or_create(device_id=device_id, ordered=False, order_completed=False)
        cartitems = cart.cartitems.all()
    else:
        cart = []
        cartitems = []
        cart = {'cartquantity': 0}

    brandfilter = get_object_or_404(Brand, title=title)
    products = Product.objects.filter(brand=brandfilter)
    categorys = Category.objects.all()
    brands = Brand.objects.all()
    context = {'products': products, 'categorys': categorys, 'brands': brands, 'cart': cart, 'cartitems': cartitems, 'brandfilter': brandfilter}
    return render(request, 'shop/brandfilter.html', context)

def orderHistory(request):
    if request.user.is_authenticated and request.COOKIES.get('device_id') is not None:
        customer = request.user
        device_id = request.COOKIES['device_id']
        cart, created = Cart.objects.get_or_create(customer=customer, ordered = False, order_completed=False)
        cartitems = cart.cartitems.all()
        if cart.device_id is None:
            cart.device_id = device_id
            cart.save()
        cart.save()
    elif request.COOKIES.get('device_id') is not None:
        device_id = request.COOKIES['device_id']
        orders = Cart.objects.filter(device_id=device_id, ordered=True, order_completed=True)
        cart, created = Cart.objects.get_or_create(device_id=device_id, ordered=False, order_completed=False)
        cartitems = cart.cartitems.all()
    else:
        cart = []
        cartitems = []
        cart = {'cartquantity': 0}

    categorys = Category.objects.all()
    brands = Brand.objects.all()
    context = {'cart': cart, 'cartitems': cartitems, 'categorys':categorys, 'brands':brands, 'orders':orders}
    return render(request, 'shop/order-history.html', context)



'''def cart(request):
	"""docstring for cart"""
	if request.user.is_authenticated:
		customer = request.user
        device_id = request.COOKIES['device_id']
		cart, created = Cart.objects.get_or_create(customer=cutomer, ordered=False, order_completed= False)
		cartitems = cart.cartitems.all()
	else:
		cartitems = []
		cart = []
		cart = {'cartquantity': 0}

	context = {'cartitems':cartitems, 'cart':cart}
	return render(request, 'shop/cart.html', context)'''
'''
def cart(request):
    if request.user.is_authenticated:
        customer = request.user
        device_id = request.COOKIES['device_id']
        cart, created = Cart.objects.get_or_create(customer=customer, device_id=device_id, ordered = False, order_completed=False)
        cartitems = cart.cartitems.all()
    else:
        cart = []
        cartitems = []
        cart = {'cartquantity': 0}
    context = {'cart': cart, 'cartitems': cartitems}
    return render(request, 'shop/cart.html', context)
'''
#custom cart view
def cart(request):
    if request.user.is_authenticated and request.COOKIES.get('device_id') is not None:
        customer = request.user
        device_id = request.COOKIES['device_id']
        cart, created = Cart.objects.get_or_create(customer=customer, ordered = False, order_completed=False)
        cartitems = cart.cartitems.all()
        if cart.device_id is None:
            cart.device_id = device_id
            cart.save()
        cart.save()
    elif request.COOKIES.get('device_id') is not None:
        device_id = request.COOKIES['device_id']
        cart, created = Cart.objects.get_or_create(device_id=device_id, ordered=False, order_completed=False)
        cartitems = cart.cartitems.all()
    else:
        cart = []
        cartitems = []
        cart = {'cartquantity': 0}

    categorys = Category.objects.all()
    brands = Brand.objects.all()
    context = {'cart': cart, 'cartitems': cartitems, 'categorys':categorys, 'brands':brands}
    return render(request, 'shop/cart.html', context)



from django.views.decorators.csrf import csrf_exempt
@csrf_exempt
def updateCart(request):
    data = json.loads(request.body)
    product_id = data['product_id']
    action = data['action']

    if request.user.is_authenticated and request.COOKIES.get('device_id') is not None:
        customer = request.user
        device_id = request.COOKIES['device_id']
        product = Product.objects.get(product_id= product_id)
        cart, created = Cart.objects.get_or_create(customer=customer, ordered=False, order_completed=False)
        cartitems, created = CartItems.objects.get_or_create(product=product, cart=cart)
        if cart.device_id is None:
            cart.device_id = device_id
            cart.save()
        cart.save()

        if action == 'add':
            cartitems.quantity += 1
        elif action == "remove":
            cartitems.quantity -= 1
        cartitems.save()

        msg = {
            'cartquantity': cart.cartquantity
        }

    else:
        device_id = request.COOKIES['device_id']
        product = Product.objects.get(product_id=product_id)
        cart, created = Cart.objects.get_or_create(device_id=device_id, ordered=False, order_completed=False)
        cartitems, created = CartItems.objects.get_or_create(product=product, cart=cart)

        if action == 'add':
            cartitems.quantity += 1
        elif action == "remove":
            cartitems.quantity -= 1
        cartitems.save()

        msg = {
            'cartquantity': cart.cartquantity
        }

    return JsonResponse(msg, safe=False)


from django.views.decorators.csrf import csrf_exempt
@csrf_exempt
def updateQuantity(request):
    data = json.loads(request.body)
    #inputval = int(data['in_val'])
    product_id = data['product_id']
    action = data['action']
    if request.user.is_authenticated and request.COOKIES.get('device_id') is not None:
        customer = request.user
        device_id = request.COOKIES['device_id']
        product = Product.objects.get(product_id= product_id)
        cart, created = Cart.objects.get_or_create(customer=customer, ordered=False, order_completed=False)
        cartitems, created = CartItems.objects.get_or_create(product=product, cart=cart)
        if cart.device_id is None:
            cart.device_id = device_id
            cart.save()
        cart.save()

        '''cartitems.quantity = inputval
        if cartitems.quantity < 1:
            cartitems.delete()
        else:
            cartitems.save()'''

        if action == 'add':
            cartitems.quantity += 1
        elif action == "remove":
            cartitems.quantity -= 1
            if cartitems.quantity < 1:
                cartitems.delete()
        cartitems.save()



        msg = {
            'subtotal':cartitems.subtotal,
            'grandtotal': cart.grandtotal,
            'cartquantity': cart.cartquantity,
            'quantity': cartitems.quantity
        }

    else:
        device_id = request.COOKIES['device_id']
        product = Product.objects.get(product_id=product_id)
        cart, created = Cart.objects.get_or_create(device_id=device_id, ordered=False, order_completed=False)
        cartitems, created = CartItems.objects.get_or_create(product=product, cart=cart)

        if action == 'add':
            cartitems.quantity += 1
        elif action == "remove":
            cartitems.quantity -= 1
        cartitems.save()

        msg = {
            'subtotal':cartitems.subtotal,
            'grandtotal': cart.grandtotal,
            'cartquantity': cart.cartquantity,
            'quantity': cartitems.quantity
        }


    return JsonResponse(msg, safe=False)
'''
def checkout(request):
    if request.user.is_authenticated:
        customer = request.user
        device_id = request.COOKIES['device_id']
        cart, created = Cart.objects.get_or_create(customer=customer, device_id=device_id, ordered = False, order_completed=False)
        cartitems = cart.cartitems.all()
    elif request.COOKIES.get('device_id') is not None:
        device_id = request.COOKIES['device_id']
        cart, created = Cart.objects.get_or_create(device_id=device_id, ordered=False, order_completed=False)
        cartitems = cart.cartitems.all()
    else:
        cart = []
        cartitems = []
        cart = {'cartquantity': 0}

    context = {'cart': cart, 'cartitems': cartitems}
    return render(request, 'shop/checkout.html', context)
'''
def checkout(request):
    if request.user.is_authenticated and request.COOKIES.get('device_id') is not None:
        customer =request.user
        device_id = request.COOKIES['device_id']
        cart, created = Cart.objects.get_or_create(customer=customer, ordered = False, order_completed=False)
        cartitems = cart.cartitems.all()
        if cart.device_id is None:
            cart.device_id = device_id
            cart.save()
        cart.save()

        form = checkoutform(request.POST, request.FILES, instance=cart)
        if form.is_valid():
            form.save()
            return redirect('payment')
    elif request.COOKIES.get('device_id') is not None:
        device_id = request.COOKIES['device_id']
        cart, created = Cart.objects.get_or_create(device_id=device_id, ordered=False, order_completed=False)
        cartitems = cart.cartitems.all()
        form = checkoutform(request.POST, request.FILES, instance=cart)
        if form.is_valid():
            form.save()
            return redirect('payment')

    else:
        cart = []
        cartitems = []
        cart = {'cartquantity': 0}
        form = checkoutform()

    categorys = Category.objects.all()
    brands = Brand.objects.all()
    context = {'cart': cart, 'cartitems': cartitems, 'form':form, 'categorys':categorys, 'brands':brands}
    return render(request, 'shop/checkout.html', context)
'''
def darlenecheckout(request):
    if request.method == 'POST':
        if request.user.is_authenticated:
            customer =request.user
            cart,created = Cart.objects.get_or_create(customer=customer, order_completed=False, ordered=False)
            cartitems = cart.cartitems.all()
        elif request.COOKIES.get('device_id') is not None:
            device_id = request.COOKIES['device_id']
            cart, created = Cart.objects.get_or_create(device_id=device_id, ordered=False, order_completed=False)
            cartitems = cart.cartitems.all()
        else:
            cart = []
            cartitems = []
            cart = {'cartquantity': 0}
        form = checkoutform(request.POST, request.FILES, instance=cart)
        if form.is_valid():
            form.save()
            return redirect('darl-checkout')

    else:
        cart = []
        cartitems = []
        cart = {'cartquantity': 0}
        form = checkoutform()
    context = {'cart': cart, 'cartitems': cartitems, 'form':form}
    return render(request, 'shop/dar-checkout.html', context)

'''
def pay(request):
    if request.user.is_authenticated and request.COOKIES.get('device_id') is not None:
        customer = request.user
        device_id = request.COOKIES['device_id']
        cart, created = Cart.objects.get_or_create(customer=customer, ordered = False, order_completed=False)
        cartitems = cart.cartitems.all()
        if cart.device_id is None:
            cart.device_id = device_id
            cart.save()
        cart.save()

    elif request.COOKIES.get('device_id') is not None:
        device_id = request.COOKIES['device_id']
        cart, created = Cart.objects.get_or_create(device_id=device_id, ordered=False, order_completed=False)
        cartitems = cart.cartitems.all()
    else:
        cart = []
        cartitems = []
        cart = {'cartquantity': 0}

    categorys = Category.objects.all()
    brands = Brand.objects.all()
    context = {'cart': cart, 'cartitems': cartitems, 'categorys':categorys, 'brands':brands}
    return render(request, 'shop/darlenecart_payment.html', context)



from django.views.decorators.csrf import csrf_exempt
@csrf_exempt
def payment(request):
    data = json.loads(request.body)
    if request.user.is_authenticated and request.COOKIES.get('device_id') is not None:
        customer = request.user
        device_id = request.COOKIES['device_id']
        cart, created = Cart.objects.get_or_create(customer=customer, ordered=False, order_completed=False)
        total = float(data['cart_total'])
        if cart.device_id is None:
            cart.device_id = device_id
            cart.save()
        cart.save()
        
        if total == cart.grandtotal:
            cart.order_completed = True
            cart.ordered = True
            cart.save()
        
    elif request.COOKIES.get('device_id') is not None:
        device_id = request.COOKIES['device_id']
        cart, created = Cart.objects.get_or_create(device_id=device_id, ordered=False, order_completed=False)
        total = float(data['cart_total'])

        if total == cart.grandtotal:
            cart.order_completed = True
            cart.ordered = True
            cart.save()
        
        
    return JsonResponse('It is working', safe=False)