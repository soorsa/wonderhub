import django_filters
from django import forms

from .models import Course, Enrollments,Withdrawal,Category

class CourseFilter(django_filters.FilterSet):
    search = django_filters.CharFilter(field_name='title', lookup_expr='icontains',widget=forms.TextInput(attrs={'type':'search'}))
    category = django_filters.ModelChoiceFilter(queryset=Category.objects.all(), widget=forms.Select())

    class Meta:
        model = Course
        fields = '__all__'
        exclude = ['title','image','price','preview','description','students','is_top','course_id','date_created','date_updated']

class EnrollmentsFilter(django_filters.FilterSet):
    start_date = django_filters.DateFilter(widget=forms.DateInput(attrs={'type':'date'}))
    class Meta:
        model =Enrollments
        fields = ['start_date', 'paid']

class WithdrawalFilter(django_filters.FilterSet):
    date = django_filters.DateFilter(widget=forms.DateInput(attrs={'type':'date'}))
    class Meta:
        model =Withdrawal
        fields = ['date', 'status']