"""wonderhub_stack URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from fileinput import hook_encoded
from django.urls import path
from django.contrib.auth import views as login_views
from . import views
from . import auth_views
from . import mgt_views


urlpatterns = [
    path('webdev/', views.index, name='web-dev'),
    path('',  views.wonderhub, name='wonderhub'),
    path("courses/", views.filtered_courses, name="filtered_courses"),
    path("category/<str:cat_title>/", views.course_byCategory, name="course-by-cat"),
    path("intructors/", views.allInstructors, name="all-instructors"),
    path("instructor/<str:instructor>", views.course_byInstructor, name="course-by-instructor"),

    path('createcourse/', views.create_course, name='create-course'),
    path("course/<str:course_id>/update/", views.update_course, name="update-course"),
    path("course/<str:course_id>/delete/", views.delete_course, name="delete-lesson"),
    path("lesson/<str:lesson_id>/update/", views.update_lesson, name="update-lesson"),
    path("lesson/<str:lesson_id>/delete/", views.delete_lesson, name="delete-lesson"),
    path("enroll/course/<str:course_id>", views.enroll_for_course, name="course-enroll"),

    path("course/<str:course_id>", views.view_course, name="course-detail"),
    path("lesson/<str:lesson_id>", views.view_lesson, name="lesson-detail"),
    path('createlesson/<str:course_id>', views.create_lesson, name='create-lesson'),
    path("takequiz/<int:pk>/", views.takeQuiz, name="take-quiz"),
    # path("submit/<int:question_id>/", views.submitQuiz, name="submit-quiz"),
    path('make-withdrawal/', views.make_withdrawals, name='make-withdrawal'),
    path('dashboard/', views.instructorDashboard, name='instructor-dashboard'),
    path('dashboard/student', views.studentDashboard, name='student-dashboard'),
    path('soorsa/', views.soorsa, name='soorsa'),

    # AUTH VIEWS
    path('register/student', auth_views.studentRegisteration, name='student-signup'),
    path('register/instructor', auth_views.instructorRegisteration, name='instructor-signup'),
    path("become-an-instructor/", auth_views.becomeInstructorPage, name="become-instructor"),
    path('login/', login_views.LoginView.as_view(template_name='wonderhub/login.html'), name = 'login'),
    path('logout/', login_views.LogoutView.as_view(template_name='wonderhub/logout.html'), name = 'logout'),


    # MGT VIEWS
    path("mgt/", mgt_views.adminIndex, name="mgt"),
]
