# Generated by Django 4.1.5 on 2023-07-29 16:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wonderhub', '0008_course_preview_rating_review_student_image_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='course',
            name='price',
            field=models.PositiveIntegerField(default=0),
        ),
    ]
