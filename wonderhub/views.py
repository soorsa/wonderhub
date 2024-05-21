from django.shortcuts import render, redirect, get_object_or_404
from .forms import *
from django.utils import timezone
from datetime import timedelta
from django.db.models import Sum, Q
from django.db.models.functions import TruncDate
from django.contrib.auth.models import User
from .serializers import *
from .filters import *
from django_filters import rest_framework as filters
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
import json
from django.http import JsonResponse, HttpResponse
from validate_email import validate_email
from django.contrib.auth.decorators import login_required, user_passes_test
from django.contrib import messages
from .models import *
from .custom_decorators import *

# Create your views here.
def index(request):
    context = {
        'courses':Course.objects.all()
    }
    return render(request, 'wonderhub/index.html', context)

def wonderhub(request):
    context = {
        'courses': Course.objects.filter()[:30],
        'top_courses':Course.objects.filter(is_top=True),
        'top_instructors': Instructor.objects.filter(is_top=True),
        'categories': Category.objects.filter(parent=None),
        'top_categories': Category.objects.filter(is_top=True)
    }
    return render(request, 'wonderhub/home.html', context)

def filtered_courses(request):
    courses = Course.objects.filter().order_by('-date_created')
    filter = CourseFilter(request.GET, queryset=courses)
    categories = Category.objects.filter(parent=None)
    context={
        'filter':filter,
        'categories':categories,
    }
    return render(request, 'wonderhub/filtered_courses.html', context)

def courseSearch(request):
    search_params = request.GET.get('course_search')
    if search_params:
        courses = Course.objects.filter(Q(title_icontains=search_params | Q(descripption_icontains=search_params)))
    else:
        courses =Course.objects.filter()
    categories = Category.objects.filter(parent=None)
    context = {
        'courses' : courses,
        'categories': categories,
    }
    return render(request, 'wonderhub/filtered_courses.html', context)
def soorsa(request):
    return render(request, 'wonderhub/soorsa.html')

def course_byCategory(request, cat_title):
    try:
        category_filter = Category.objects.get(title=cat_title)
    except Category.DoesNotExist:
        return redirect('wonderhub')
    context = {
        'category_filter':category_filter,
        'categories': Category.objects.filter(parent=None),
        'courses':Course.objects.filter(category=category_filter)
    }
    return render(request, 'wonderhub/course-by-category.html', context)

def course_byInstructor(request, instructor):
    try:
        course_filter = Instructor.objects.get(instructor__username=instructor)
    except Instructor.DoesNotExist:
        return redirect('wonderhub')
    context = {
        'course_filter':course_filter,
        'categories': Category.objects.filter(parent=None),
        'courses':Course.objects.filter(instructor=course_filter)
    }
    return render(request, 'wonderhub/course-by-instructor.html', context)


# LIST ALL INSTRUCTORS
def allInstructors(request):
    instructors = Instructor.objects.all()
    context ={
        'instructors': instructors,
        'categories': Category.objects.filter(parent=None),
    }
    return render(request, 'wonderhub/all-instructors.html', context)


@login_required
@is_instructor
def create_course(request):   
    if request.method == 'POST':
        form = CreateCourseForm(request.POST, request.FILES)
        if form.is_valid():
            form.instance.instructor = request.user.instructor
            course = form.save()
            messages.success(request, course.title + 'Course created successfully')
            return redirect('create-lesson', course_id=course.course_id)
        
    else:
        form = CreateCourseForm()
    context = {
        'categories':Category.objects.all(),
        'form': form,
    }
    return render(request, 'wonderhub/create-course.html', context)

@login_required
@is_instructor
def update_course(request, course_id):
    course = Course.objects.get(course_id=course_id)
    lessons = Lesson.objects.filter(course=course)   
    if course.instructor == request.user.instructor:
        if request.method == 'POST':
            form = UpdateCourseForm(request.POST,request.FILES, instance=course)
            if form.is_valid():
                form.instance.instructor = request.user.instructor
                u_course = form.save()
                messages.success(request, 'Updated ' + u_course.title + 'successfully')
                return redirect('course-detail', course_id=course.course_id)
            
        else:
            form = UpdateCourseForm(instance=course)
    else:
        return HttpResponse(' <div style=" background: radial-gradient(#1b0c20, gray) ; height: 100vh; width:100%; display:flex; justify-content:center;" > <div style="background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));backdrop-filter: blur(5px); width:80%; text-align:center; border-radius:10px; margin-top:150px; height:fit-content;" > <div style="padding-top:50px;padding-bottom:50px;"> <h2 style="color:red;"> Sorry you are not Authorized... </h2><p style="color:white;"> This course does not belong to you </p> </div> </div> </div> ')
    context = {
        'categories':Category.objects.filter(parent=None),
        'form': form,
        'course':course,
        'lessons':lessons,
    }
    return render(request, 'wonderhub/update-course.html', context)

@login_required
@is_instructor
def delete_course(request, course_id):
    course = Course.objects.get(course_id=course_id)
    if course.instructor == request.user.instructor:
        course.delete()
        messages.error(request, 'you have deleted ' + course.title)
        return redirect('instructor-dashboard')
    else:
        return HttpResponse(' <div style=" background: radial-gradient(#1b0c20, gray) ; height: 100vh; width:100%; display:flex; justify-content:center;" > <div style="background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));backdrop-filter: blur(5px); width:80%; text-align:center; border-radius:10px; margin-top:150px; height:fit-content;" > <div style="padding-top:50px;padding-bottom:50px;"> <h2 style="color:red;"> Sorry you are not Authorized... </h2><p style="color:white;"> This course does not belong to you </p> </div> </div> </div> ')


@login_required
@is_instructor
def create_lesson(request, course_id):
    course = Course.objects.get(course_id=course_id)
    lessons = Lesson.objects.filter(course=course)
    if course.instructor == request.user.instructor:
        if request.method == 'POST':
            form= CreateLessonForm(request.POST, request.FILES)
            if form.is_valid():
                form.instance.course = course
                lesson = form.save()
                messages.success(request, lesson.title + ' lesson created successfully')
                return redirect('create-lesson', course_id=course.course_id)
        else:
            form = CreateLessonForm()
    else:
        return HttpResponse(' <div style=" background: radial-gradient(#1b0c20, gray) ; height: 100vh; width:100%; display:flex; justify-content:center;" > <div style="background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));backdrop-filter: blur(5px); width:80%; text-align:center; border-radius:10px; margin-top:150px; height:fit-content;" > <div style="padding-top:50px;padding-bottom:50px;"> <h2 style="color:red;"> Sorry you are not Authorized... </h2><p style="color:white;"> This course does not belong to you </p> </div> </div> </div> ')
    context={'course':course, 'lessons':lessons, 'form': form,}
    return render(request, 'wonderhub/create-lesson.html', context)

@login_required
@is_instructor
def update_lesson(request, lesson_id):
    try:
        lesson = Lesson.objects.get(lesson_id=lesson_id)
        lessons = Lesson.objects.filter(course=lesson.course)
    except Lesson.DoesNotExist:
        return HttpResponse(' <div style=" background: radial-gradient(#1b0c20, gray) ; height: 100vh; width:100%; display:flex; justify-content:center;" > <div style="background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));backdrop-filter: blur(5px); width:80%; text-align:center; border-radius:10px; margin-top:150px; height:fit-content;" > <div style="padding-top:50px;padding-bottom:50px;"> <h2 style="color:red;"> Sorry... </h2><p style="color:white;"> This lesson does not exist</p> </div> </div> </div> ')
    if lesson.course.instructor == request.user.instructor:
        if request.method == 'POST':
            form= UpdateLessonForm(request.POST,request.FILES,instance=lesson)
            if form.is_valid():
                u_lesson=form.save()
                messages.success(request, 'You have updated' + u_lesson.title + 'successfully')
                return redirect('course-detail', course_id=lesson.course.course_id)
        else:
            form = UpdateLessonForm(instance=lesson)
    else:
        return HttpResponse(' <div style=" background: radial-gradient(#1b0c20, gray) ; height: 100vh; width:100%; display:flex; justify-content:center;" > <div style="background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));backdrop-filter: blur(5px); width:80%; text-align:center; border-radius:10px; margin-top:150px; height:fit-content;" > <div style="padding-top:50px;padding-bottom:50px;"> <h2 style="color:red;"> Sorry you are not Authorized... </h2><p style="color:white;"> This course does not belong to you </p> </div> </div> </div> ')
    context = {
        'lesson':lesson,
        'lessons':lessons,
        'form':form,
        'categories':Category.objects.filter(parent=None),
    }
    return render(request, 'wonderhub/update-lesson.html',context)

@login_required
@is_instructor
def delete_lesson(request, lesson_id):
    lesson = Lesson.objects.get(lesson_id=lesson_id)
    if lesson.course.instructor == request.user.instructor:
        lesson.delete()
        return redirect('create-lesson', course_id=lesson.course.course_id)
    else:
        return HttpResponse(' <div style=" background: radial-gradient(#1b0c20, gray) ; height: 100vh; width:100%; display:flex; justify-content:center;" > <div style="background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));backdrop-filter: blur(5px); width:80%; text-align:center; border-radius:10px; margin-top:150px; height:fit-content;" > <div style="padding-top:50px;padding-bottom:50px;"> <h2 style="color:red;"> Sorry you are not Authorized... </h2><p style="color:white;"> This course does not belong to you </p> </div> </div> </div> ')

@login_required
def view_course(request, course_id):
    try:
        course = Course.objects.get(course_id=course_id)
    except Course.DoesNotExist:
        return HttpResponse('<div style=" background: radial-gradient(#1b0c20, gray) ; height: 100vh; width:100%; display:flex; justify-content:center;" > <div style="background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));backdrop-filter: blur(5px); width:80%; text-align:center; border-radius:10px; margin-top:150px; height:fit-content;" > <div style="padding-top:50px;padding-bottom:50px;"> <h2 style="color:red;"> Sorry... </h2><p style="color:white;"> This course does not exist </p> </div> </div> </div> ')
    try:
        user_std = request.user
        if hasattr(user_std, 'student'):
            my_enrolled_courses = Course.objects.filter(students=request.user.student)
        else:
            my_enrolled_courses = False
    except Course.DoesNotExist:
        my_enrolled_courses = False

    try:
        user_review=course.ratings.get(user=request.user.student)
        if user_review:
            hide_form = True
        else:
            hide_form = False
    except Rating.DoesNotExist:
        user_review = False
        hide_form = False
    except AttributeError:
        user_review = False
        hide_form = True
    if request.method == 'POST':
        form = RatingForm(request.POST)
        context = {
            "course" : course,
            'categories': Category.objects.filter(parent=None),

            'user_review': user_review,
            'form':form,
            'hide_form': hide_form,
            "my_enrolled_courses":my_enrolled_courses,
            "lessons" : Lesson.objects.filter(course=course),
            "quizzes" : Quiz.objects.filter(course=course),
            "discussions" : Discussion.objects.filter(course=course),
        }
        if form.is_valid():
            form.instance.course = course
            form.instance.user = request.user.student
            form.save()
            form = RatingForm()
            return redirect('course-detail', course_id=course.course_id)
        else:
            return HttpResponse('<div style=" background: radial-gradient(#1b0c20, gray) ; height: 100vh; width:100%; display:flex; justify-content:center;" > <div style="background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));backdrop-filter: blur(5px); width:80%; text-align:center; border-radius:10px; margin-top:150px; height:fit-content;" > <div style="padding-top:50px;padding-bottom:50px;"> <h2 style="color:red;"> Sorry... </h2><p style="color:white;"> This course does not exist </p> </div> </div> </div> ')

    else:
        form = RatingForm()
        context = {
            "course" : course,
            'user_review': user_review,
            'form':form,
            'categories': Category.objects.filter(parent=None),
            'hide_form':hide_form,
            "my_enrolled_courses":my_enrolled_courses,
            "lessons" : Lesson.objects.filter(course=course),
            "quizzes" : Quiz.objects.filter(course=course),
            "discussions" : Discussion.objects.filter(course=course),
        }
        return render(request, 'wonderhub/view_course.html', context)

@login_required
def view_lesson(request, lesson_id):
    try:
        lesson = Lesson.objects.get(lesson_id=lesson_id)
    except Lesson.DoesNotExist:
        return HttpResponse('<div style=" background: radial-gradient(#1b0c20, gray) ; height: 100vh; width:100%; display:flex; justify-content:center;" > <div style="background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));backdrop-filter: blur(5px); width:80%; text-align:center; border-radius:10px; margin-top:150px; height:fit-content;" > <div style="padding-top:50px;padding-bottom:50px;"> <h2 style="color:red;"> Sorry... </h2><p style="color:white;"> This lesson does not exist </p> </div> </div> </div> ')

    try:
        user_std = request.user
        if hasattr(user_std, 'student'):
            my_enrolled_courses = Course.objects.filter(students=request.user.student)
        else:
            my_enrolled_courses = False
    except Course.DoesNotExist:
        my_enrolled_courses = False
    try:
        user_review=lesson.course.ratings.get(user=request.user.student)
        if user_review:
            hide_form = True
        else:
            hide_form = False
    except Rating.DoesNotExist:
        user_review = False
        hide_form = False
    except AttributeError:
        user_review = False
        hide_form = True

    if request.method == 'POST':
        form = RatingForm(request.POST)
        context = {
            "course" : lesson.course,
            'user_review': user_review,
            'form':form,
            'hide_form': hide_form,
            "lesson" : lesson,
            "my_enrolled_courses": my_enrolled_courses,
            "lessons" : Lesson.objects.filter(course=lesson.course),
            'categories': Category.objects.filter(parent=None),
            "quizzes" : Quiz.objects.filter(course=lesson.course),
            "discussions" : Discussion.objects.filter(course=lesson.course),
        }
        if form.is_valid():
            form.instance.course = lesson.course
            form.instance.user = request.user.student
            form.save()
            form = RatingForm()
            return redirect('lesson-detail', lesson_id=lesson.lesson_id)
        else:
            return HttpResponse('<div style=" background: radial-gradient(#1b0c20, gray) ; height: 100vh; width:100%; display:flex; justify-content:center;" > <div style="background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));backdrop-filter: blur(5px); width:80%; text-align:center; border-radius:10px; margin-top:150px; height:fit-content;" > <div style="padding-top:50px;padding-bottom:50px;"> <h2 style="color:red;"> Sorry... </h2><p style="color:white;"> This lesson does exist </p> </div> </div> </div> ')

    else:
        context = {
            'form' : RatingForm(),
            "lesson" : lesson,
            "user_review": user_review,
            "hide_form": hide_form,
            "my_enrolled_courses": my_enrolled_courses,
            "lessons" : Lesson.objects.filter(course=lesson.course),
            "quizzes" : Quiz.objects.filter(course=lesson.course),
            "discussions" : Discussion.objects.filter(course=lesson.course),
            'categories': Category.objects.filter(parent=None),
        }

    try:
        user = request.user
        if hasattr(user, 'student'):
            student = request.user.student
        else:
            student = None
        if hasattr(user, 'instructor'):
            instructor = request.user.instructor
        else:
            instructor = None
        if student in lesson.course.students.all() or instructor == lesson.course.instructor:
            return render(request, 'wonderhub/view_lesson.html', context)
        else:
            return HttpResponse(' <div style=" background: radial-gradient(#1b0c20, gray) ; height: 100vh; width:100%; display:flex; justify-content:center;" > <div style="background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));backdrop-filter: blur(5px); width:80%; text-align:center; border-radius:10px; margin-top:150px; height:fit-content;" > <div style="padding-top:50px;padding-bottom:50px;"> <h2 style="color:red;"> Sorry... </h2><p style="color:white;"> yoou are not enrolled for this course yet </p> </div> </div> </div> ')
    except AttributeError:
        return HttpResponse('<div style=" background: radial-gradient(#1b0c20, gray) ; height: 100vh; width:100%; display:flex; justify-content:center;" > <div style="background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));backdrop-filter: blur(5px); width:80%; text-align:center; border-radius:10px; margin-top:150px; height:fit-content;" > <div style="padding-top:50px;padding-bottom:50px;"> <h2 style="color:red;"> Sorry... </h2><p style="color:white;"> you are not a student. <a href=''>Create student account</a> </p> </div> </div> </div> ')




@login_required
@is_student
def enroll_for_course(request, course_id):
    course = Course.objects.get(course_id=course_id)
    student = request.user.student
    course.students.add(student)
    course.save()
    enrollment = Enrollments(student=student, course=course, instructor=course.instructor, price=course.price)
    enrollment.save()
    instructor =  course.instructor
    instructor.balance+=course.price - course.price * 0.15
    instructor.save()
    messages.success(request, 'You have successfully enrolled for' + course.title)
    return redirect('student-dashboard')
    

@login_required
@is_instructor
def instructorDashboard(request):
    try:
        bank_account = request.user.instructor.bank_accounts
    except BankAccount.DoesNotExist:
        bank_account = BankAccount.objects.create(instructor=request.user.instructor)
    my_courses = Course.objects.filter(instructor=request.user.instructor)
    enrollments = Enrollments.objects.filter(instructor=request.user.instructor)
    filter_by_date = EnrollmentsFilter(request.GET, queryset=enrollments)
    withdrawals = Withdrawal.objects.filter(instructor=request.user.instructor)
    withdrawals_filter = WithdrawalFilter(request.GET, queryset=withdrawals)
    if request.method == 'POST':
        form= UpdateInstructorForm(request.POST,request.FILES, instance=request.user.instructor)
        b_form = BankDetailForm(request.POST, request.FILES, instance=bank_account)
        if form.is_valid():
            form.save()
            messages.success(request, ' Profile updated successfully')
            return redirect('instructor-dashboard')
        if b_form.is_valid():
            b_form.save()
            messages.success(request, 'Payout details updated successfully')
            return redirect('instructor-dashboard')
    else:
        form = UpdateInstructorForm(instance=request.user.instructor)
        b_form = BankDetailForm(instance=bank_account)
    context = {
        'my_courses' : my_courses,
        'form':form,
        'b_form':b_form,
        'enrollments': enrollments,
        'filter_by_date': filter_by_date,
        'withdrawals_filter':withdrawals_filter,
        'categories': Category.objects.filter(parent=None),
    }
    
    return render(request, 'wonderhub/instructor-dashboard.html', context)

@login_required
@is_student
def studentDashboard(request):
    my_courses = Course.objects.filter(students=request.user.student)
    if request.method == 'POST':
        form= UpdateStudentForm(request.POST,request.FILES, instance=request.user.student)
        if form.is_valid():
            form.save()
            messages.success(request, ' Profile updated successfully')
            return redirect('student-dashboard')
    else:
        form = UpdateStudentForm(instance=request.user.student)
    context = {
        'categories': Category.objects.filter(parent=None),
        'my_courses' : my_courses,
        'form': form
    }
    
    return render(request, 'wonderhub/student-dashboard.html', context)

@login_required
def take_quiz(request, quiz_id):
    quiz = Quiz.objects.get(id=quiz_id)
    questions = Question.objects.filter(quiz=quiz)
    if request.method == 'POST':
        score = 0
        for question in questions:
            selected_answer_id = request.POST.get(str(question.id))
            selected_answer = Answer.objects.get(id=selected_answer_id)
            if selected_answer.correct:
                score += 1
        messages.success(request, f'Your score is {score}/{len(questions)}')
        return redirect('dashboard')
    return render(request, 'take_quiz.html', {'quiz': quiz, 'questions': questions})

@login_required
def takeQuiz(request,pk):
    quiz = get_object_or_404(Quiz, pk=pk)
    questions = quiz.questions.all()
    completed_quiz = UserChoice(student=request.user.student)
    completed_quiz.save()
    if request.method == 'POST':
        for question in questions:
            selected_answer_id = request.POST.get(str(question.id))
            selected_answer = AnswerChoice.objects.get(id=selected_answer_id)
            completed_quiz.selected_answer.add(selected_answer)
            if selected_answer.is_correct:
                completed_quiz.score +=1
            completed_quiz.save()

        messages.info(request, f'Your score is {completed_quiz.score}/{len(questions)}')
        return redirect('student-dashboard')

    context = {
        'quiz':quiz,
        'questions':questions
    }
    return render(request, 'wonderhub/take-quiz.html', context)

@login_required
@is_instructor
def make_withdrawals(request):
    if request.method == 'POST':
        amount = request.POST.get('withdarwalAmount')
        instructor = request.user.instructor
        if int(amount) >= 1000 and int(amount)<= instructor.balance:
            withdrawal_request = Withdrawal(instructor=instructor,amount=amount,status='pending')
            withdrawal_request.save()
            instructor.balance -= int(amount)
            instructor.save()
            messages.success(request, f'request for ₦{amount} withdrawal sent successfully')
            messages.info(request, f'Bank transfer may take 24hours to proccess... please contact us if funds are not recieved after 24hours')
            return redirect('instructor-dashboard')
        elif int(amount) > instructor.balance:
            messages.error(request , f'Sorry... Insufficient funds')
            return redirect('instructor-dashboard')
        else:
            messages.error(request, f'your withdrawal must be greater or equal to ₦1000')
            return redirect('instructor-dashboard')
    # return render(request, 'wonderhub/withdrawal-form.html')
    # return render(request, 'wonderhub/instructor-dashboard.html')
    return amount