# Generated by Django 5.1 on 2024-12-10 01:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wonderhub', '0022_alter_lesson_course_alter_withdrawal_status_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='lesson',
            name='lesson_number',
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
    ]
