from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from .models import *



class StudentRegisterForm(UserCreationForm):
	username = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Username', 'class': 'form-control username', 'id': 'usernamefield'}))
	first_name = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'First name', 'class': 'form-control firstname', 'id': 'firstnamefield'}))
	last_name = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Last name', 'class': 'form-control lastname', 'id': 'lastnamefield'}))
	email = forms.EmailField(widget=forms.EmailInput(attrs={'placeholder': 'Email', 'class': 'form-control email'}))
	phone_number = forms.CharField(widget=forms.NumberInput(attrs={'placeholder': 'Phone Number', 'class': 'form-control phone'}))
	password1 = forms.CharField(widget=forms.PasswordInput(attrs={'placeholder': 'Password', 'class': 'form-control password'}))
	password2 = forms.CharField(widget=forms.PasswordInput(attrs={'placeholder': 'Confirm Password', 'class': 'form-control password2'}))

	class Meta:
		model = User
		fields = ['username', 'first_name', 'last_name', 'email', 'phone_number', 'password1', 'password2']
		
class InstructorRegisterForm(UserCreationForm):
	username = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Username', 'class': 'form-control username', 'id': 'usernamefield'}))
	first_name = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'First name', 'class': 'form-control firstname', 'id': 'firstnamefield'}))
	last_name = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Last name', 'class': 'form-control lastname', 'id': 'lastnamefield'}))
	email = forms.EmailField(widget=forms.EmailInput(attrs={'placeholder': 'Email', 'class': 'form-control email'}))
	phone_number = forms.CharField(widget=forms.NumberInput(attrs={'placeholder': 'Phone Number', 'class': 'form-control phone'}))
	password1 = forms.CharField(widget=forms.PasswordInput(attrs={'placeholder': 'Password', 'class': 'form-control password'}))
	password2 = forms.CharField(widget=forms.PasswordInput(attrs={'placeholder': 'Confirm Password', 'class': 'form-control password2'}))

	class Meta:
		model = User
		fields = ['username', 'first_name', 'last_name', 'email', 'phone_number', 'password1', 'password2']

class UserUpdateForm(forms.ModelForm):
	email = forms.EmailField()

	class Meta:
		model = User
		fields = ['email']

class CreateCourseForm(forms.ModelForm):
    title = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Title','id': 'form-control', 'class': 'form-control', 'type':'text'}))
    category = forms.ModelMultipleChoiceField(widget=forms.CheckboxSelectMultiple, queryset=Category.objects.all())
    price = forms.CharField(widget=forms.NumberInput(attrs={'placeholder': 'price','id': 'form-control', 'class': 'form-control', 'type':'number'}))
    description = forms.CharField(widget=forms.Textarea(attrs={'placeholder': 'Description','class': 'form-control'}))

    class Meta:
        model = Course
        fields = ["title", 'category', 'price', 'description', 'image', 'preview']

class UpdateCourseForm(forms.ModelForm):
    title = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Title','id': 'form-control', 'class': 'form-control', 'type':'text'}))
    category = forms.ModelMultipleChoiceField(widget=forms.CheckboxSelectMultiple, queryset=Category.objects.all())
    price = forms.CharField(widget=forms.NumberInput(attrs={'placeholder': 'price','id': 'form-control', 'class': 'form-control', 'type':'number'}))
    description = forms.CharField(widget=forms.Textarea(attrs={'placeholder': 'Description','class': 'form-control'}))

    class Meta:
        model = Course
        fields = ["title", 'category', 'price', 'description', 'image', 'preview']

class CreateLessonForm(forms.ModelForm):
    title = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Title','id': 'form-control', 'class': 'form-control', 'type':'text'}))
    content = forms.CharField(widget=forms.Textarea(attrs={'placeholder': 'Description','class': 'form-control'}))

    class Meta:
        model = Lesson
        fields = ["title", 'content', 'video', 'audio', 'note']

class UpdateLessonForm(forms.ModelForm):
    title = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Title','id': 'form-control', 'class': 'form-control', 'type':'text'}))
    content = forms.CharField(widget=forms.Textarea(attrs={'placeholder': 'Description','class': 'form-control'}))

    class Meta:
        model = Lesson
        fields = ["title", 'content', 'video', 'audio', 'note']

class UpdateInstructorForm(forms.ModelForm):
      full_name = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Fullname','id': 'form-control', 'class': 'form-control', 'type':'text'}))
      phone_number = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Phone Number','id': 'form-control', 'class': 'form-control', 'type':'number'}))
      title = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Occupational Role','id': 'form-control', 'class': 'form-control', 'type':'text'}))
      about = forms.CharField(widget=forms.Textarea(attrs={'placeholder': 'About Me','class': 'form-control'}))
      class Meta:
            model = Instructor
            fields = ['image', 'full_name', 'title', 'phone_number', 'about']

class BankDetailForm(forms.ModelForm):
      bank = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Bank name','id': 'form-control', 'class': 'form-control', 'type':'text'}))
      account_number = forms.CharField(widget=forms.TextInput(attrs={'placeholder': '02244668855','id': 'form-control', 'class': 'form-control', 'type':'number'}))

      class Meta:
            model = BankAccount
            fields = ['bank', 'account_number']

class UpdateStudentForm(forms.ModelForm):
      full_name = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Fullname','id': 'form-control', 'class': 'form-control', 'type':'text'}))
      phone_number = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Phone Number','id': 'form-control', 'class': 'form-control', 'type':'text'}))
      class Meta:
            model = Student
            fields = ['image', 'full_name', 'phone_number']

RATING_CHOICES = [
      (1,1),
      (2,2),
      (3,3),
      (4,4),
      (5,5),
]

class RatingForm(forms.ModelForm):
      star =forms.IntegerField(widget=forms.RadioSelect(choices=[(1, '1'), (2, '2'), (3, '3'), (4, '4'), (5, '5')]))
      review= forms.CharField(widget=forms.Textarea(attrs={'placeholder': 'How was this course?...', 'name': 'review', 'cols':'', 'rows': '3'}))
      class Meta:
            model = Rating
            fields = ['star', 'review']