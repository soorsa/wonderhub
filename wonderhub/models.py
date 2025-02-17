import os
import email
from email.policy import default
from tabnanny import verbose
from django.db import models
from django.core.validators import MaxValueValidator,MinValueValidator
from django.db.models import Sum
from django.db.models.signals import pre_save, post_save
from django.shortcuts import reverse
from django.contrib.auth.models import User
from django.utils import timezone
from datetime import timedelta
from django.utils.text import slugify
from ckeditor.fields import RichTextField
from PIL import Image
from random import randint
import uuid

STATUS_CHOICES = (
    ('success','success'),
    ('pending','pending'),
    ('failed','failed')
)


# Create your models here.
class Category(models.Model):
    """Model definition for Category."""

    title = models.CharField( max_length=50)
    parent = models.ForeignKey('self', null=True, blank=True, related_name='sub_category', on_delete=models.CASCADE)
    is_top = models.BooleanField(default=False)

    class Meta:
        """Meta definition for Category."""

        verbose_name = 'Category'
        verbose_name_plural = 'Categories'

    def __str__(self):
        """Unicode representation of Category."""
        return self.title


class Student(models.Model):
    student = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='student', default='profile.svg')
    full_name = models.CharField(max_length=50)
    phone_number = models.IntegerField()
    active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.full_name # TODO
    
class Instructor(models.Model):
    instructor = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='instructor', default='profile.svg')
    full_name = models.CharField( max_length=200)
    title = models.CharField( max_length=50, blank=True, null=True)
    phone_number = models.CharField(max_length=50, blank=True,null=True)
    about = models.TextField(blank=True, null=True)
    balance = models.FloatField(default=0, blank=True, null=True)
    active = models.BooleanField(default=False)
    is_top = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    @property
    def total_earnings(self):
        earning = 0
        courses = self.courses.all()
        for c in courses:
            earning += c.earnings

        return earning
    
    @property
    def unpaid_earnings(self):       
        total = self.enrollments.filter(paid=False).aggregate(Sum('payable'))
        return total

    @property
    def total_enrollment(self):
        emnt = 0
        courses = self.courses.all()
        for c in courses:
            emnt += c.students.count()
        return emnt

    def __str__(self):
        return self.full_name

class BankAccount(models.Model):
    instructor = models.OneToOneField(Instructor, on_delete=models.CASCADE, related_name='bank_accounts')
    bank = models.CharField(max_length=50, blank=True, null=True)
    account_number = models.CharField(max_length=50, blank=True, null=True)
    

    class Meta:
        verbose_name = ("BankAccount")
        verbose_name_plural = ("BankAccounts")

    def __str__(self):
        return f"{self.instructor}'s {self.bank} bank"

    # def get_absolute_url(self):
    #     return reverse("BankAccount_detail", kwargs={"pk": self.pk})


class Course(models.Model):
    def folder_name(instance, filename):
        return os.path.join(instance.title, filename)
    
    category = models.ManyToManyField(Category)
    title = models.CharField(max_length=200)
    image = models.ImageField( upload_to=folder_name, default='default.jpg')
    price = models.PositiveIntegerField(default=0)
    preview = models.FileField(upload_to='previews', blank=True, null=True)
    description = models.TextField()
    instructor = models.ForeignKey(Instructor, related_name='courses', on_delete=models.CASCADE)
    students = models.ManyToManyField(Student, blank=True,null=True)
    is_top = models.BooleanField(default=False)
    course_id = models.UUIDField(default=uuid.uuid4, primary_key=True, unique=True, editable=False)
    submitted = models.BooleanField(default=False)
    approved = models.BooleanField(default=False)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    @property
    def stars(self):
        ratings = self.ratings.all()
        dnt = ratings.count()
        star = 0
        for rate in ratings:
            star += rate.star
        if dnt == 0:
            avg = 4.5
        else:
            avg = star/dnt
        return avg

    @property
    def earnings(self):
        students = self.students.count()
        price =self.price - self.price * 0.15
        total = students * price
        return total
        
    def __str__(self):
        return self.title

class WYWL(models.Model):
    text = models.CharField(max_length=200, blank=True,null=True)
    course = models.ForeignKey(Course, on_delete=models.CASCADE ,related_name="what_you_will_learn")
    def __str__(self):
        return self.text

class Lesson(models.Model):

    def folder_name(instance, filename):
        return os.path.join(instance.course.title,instance.title, filename)

    title = models.CharField(max_length=200)
    content = models.TextField()
    course = models.ForeignKey(Course, on_delete=models.CASCADE,related_name="lessons")
    video = models.FileField(upload_to= folder_name, blank=True, null=True )
    audio = models.FileField(upload_to= folder_name, blank=True, null=True )
    note = models.FileField( upload_to= folder_name, blank=True, null=True )
    lesson_id = models.UUIDField(default=uuid.uuid4, primary_key=True, unique=True, editable=False)
    lesson_number = models.PositiveIntegerField(blank=True, null=True)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True, editable=True)

    def __str__(self):
        return f'{self.title} - lesson for {self.course} '

class CourseProgress(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="progress")
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name="course_progress")
    completed_lessons = models.ManyToManyField(Lesson,blank=True)
    last_accessed = models.DateTimeField(auto_now=True)

    @property
    def percentage(self):
        total_lessons = self.course.lessons.count()
        completed = self.completed_lessons.count()
        cacl = completed/total_lessons * 100
        if total_lessons > 0 :
            return cacl
        return 0
    
    def __str__(self):
        return f"{self.percentage}"

class Enrollments(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    instructor = models.ForeignKey(Instructor, related_name='enrollments', on_delete=models.CASCADE)
    price = models.PositiveIntegerField(default=0)
    payable = models.PositiveIntegerField(editable=False, default=0)
    paid = models.BooleanField(default=False)
    start_date = models.DateField(auto_now_add=True)

    @property
    def calc_payable(self):
        x =self.price - self.price * 0.15
        return x

    def save(self, *args, **kwargs):
        self.payable = self.calc_payable
        super(Enrollments, self).save(*args, **kwargs)
    def __str__(self):
        return f'{self.student} paid {self.price} for {self.course} '

class Quiz(models.Model):
    title = models.CharField(max_length=200)
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='quiz')

    def __str__(self):
        return self.title

class Question(models.Model):
    text = models.CharField(max_length=200)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='questions')

    def __str__(self):
        return f'{self.text}-question for {self.quiz}'

class AnswerChoice(models.Model):
    text = models.CharField(max_length=200)
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name="answers")
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return f' {self.is_correct} answer for {self.question} '

class UserChoice(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    selected_answer = models.ManyToManyField(AnswerChoice)
    score = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f'{self.student.full_name} done quiz {self.score} points scored'
class Discussion(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Comment(models.Model):
    discussion = models.ForeignKey(Discussion, on_delete=models.CASCADE)
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.content

class Rating(models.Model):
    user = models.ForeignKey(Student, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='ratings')
    review = models.TextField(default='this is my opinion')
    star = models.PositiveIntegerField(default=1, validators=[MaxValueValidator(5),MinValueValidator(1)])

    class Meta:
        verbose_name = "Rating"
        verbose_name_plural = "Ratings"

    def __str__(self):
        return f'{self.star} star rating for {self.course}'

    def get_absolute_url(self):
        return reverse("Rating_detail", kwargs={"pk": self.pk})

class Withdrawal(models.Model):
    """Model definition for Withdrawal."""

    # TODO: Define fields here
    instructor = models.ForeignKey(Instructor, on_delete=models.CASCADE)
    amount = models.PositiveIntegerField(blank=True, null=True)
    status = models.CharField( max_length=50, choices=STATUS_CHOICES)
    date = models.DateTimeField(auto_now=True)
    class Meta:
        """Meta definition for Withdrawal."""

        verbose_name = 'Withdrawal'
        verbose_name_plural = 'Withdrawals'

    def __str__(self):
        """Unicode representation of Withdrawal."""
        return f'{self.status} withdrawal of {self.amount} by {self.instructor}'
