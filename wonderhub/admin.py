from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User
from .models import *

# Register your models here.
admin.site.register(Category)

class Lessons(admin.StackedInline):
    model = Lesson
    show_change_link = True
    extra = 1
    verbose_name_plural = 'lessons'
# admin.site.register(Lesson)

class CourseAdmin(admin.ModelAdmin):
    list_display = ('instructor', 'title', 'is_top')
    list_display_links = ('instructor',)
    list_editable = ('title', 'is_top')
    search_fields = ('title', 'instructor')
    list_filter = ('title', 'instructor', 'is_top')
    inlines = [Lessons]

class StudentProfile(admin.StackedInline):
    model = Student
    can_delete = False
    show_change_link = True
class InstructorProfile(admin.StackedInline):
    model = Instructor
    can_delete = False
    show_change_link = True

class UserAdmin(BaseUserAdmin):
    inlines = [StudentProfile,InstructorProfile]

class Questions(admin.StackedInline):
    model = Question
    show_change_link = True
    extra = 1
    verbose_name_plural = 'questions'
class QuizAdmin(admin.ModelAdmin):
    inlines = [Questions]

class Answers(admin.StackedInline):
    model = AnswerChoice
    verbose_name_plural = 'answers'

class QuestionAdmin(admin.ModelAdmin):
    inlines = [Answers]
admin.site.register(Course, CourseAdmin)
admin.site.unregister(User)
admin.site.register(User, UserAdmin)
#admin.site.register(Course)
admin.site.register(Student)
admin.site.register(Instructor)
admin.site.register(Enrollments)
admin.site.register(BankAccount)
# admin.site.register(Rating)
admin.site.register(Quiz, QuizAdmin)
admin.site.register(Question, QuestionAdmin)
admin.site.register(AnswerChoice)
admin.site.register(UserChoice)
admin.site.register(Withdrawal)