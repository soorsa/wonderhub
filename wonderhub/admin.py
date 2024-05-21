from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(Category)

class CourseAdmin(admin.ModelAdmin):
    list_display = ('pk', 'title', 'instructor', 'is_top')
    list_display_links = ('pk', 'instructor')
    list_editable = ('title', 'is_top')
    search_fields = ('title', 'instructor')
    list_filter = ('title', 'instructor', 'is_top')


admin.site.register(Course, CourseAdmin)

#admin.site.register(Course)
admin.site.register(Lesson)
admin.site.register(Student)
admin.site.register(Instructor)
admin.site.register(Enrollments)
admin.site.register(BankAccount)
admin.site.register(Rating)
admin.site.register(Quiz)
admin.site.register(Question)
admin.site.register(AnswerChoice)
admin.site.register(UserChoice)
admin.site.register(Withdrawal)