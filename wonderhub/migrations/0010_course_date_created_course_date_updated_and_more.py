# Generated by Django 4.1.5 on 2023-08-07 13:09

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('wonderhub', '0009_course_price'),
    ]

    operations = [
        migrations.AddField(
            model_name='course',
            name='date_created',
            field=models.DateTimeField(default=datetime.datetime(2023, 7, 8, 13, 9, 44, 435972, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AddField(
            model_name='course',
            name='date_updated',
            field=models.DateTimeField(default=datetime.datetime(2023, 7, 8, 13, 9, 44, 435989, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AddField(
            model_name='instructor',
            name='date_joined',
            field=models.DateTimeField(default=datetime.datetime(2023, 7, 8, 13, 9, 44, 435254, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AddField(
            model_name='instructor',
            name='date_updated',
            field=models.DateTimeField(default=datetime.datetime(2023, 7, 8, 13, 9, 44, 435273, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AddField(
            model_name='lesson',
            name='date_created',
            field=models.DateTimeField(default=datetime.datetime(2023, 7, 8, 13, 9, 44, 437755, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AddField(
            model_name='lesson',
            name='date_updated',
            field=models.DateTimeField(default=datetime.datetime(2023, 7, 8, 13, 9, 44, 437775, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AddField(
            model_name='student',
            name='date_joined',
            field=models.DateTimeField(default=datetime.datetime(2023, 7, 8, 13, 9, 44, 434523, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AddField(
            model_name='student',
            name='date_updated',
            field=models.DateTimeField(default=datetime.datetime(2023, 7, 8, 13, 9, 44, 434551, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='comment',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2023, 7, 8, 13, 9, 44, 441573, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='course',
            name='instructor',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='courses', to='wonderhub.instructor'),
        ),
        migrations.AlterField(
            model_name='discussion',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2023, 7, 8, 13, 9, 44, 440972, tzinfo=datetime.timezone.utc)),
        ),
        migrations.CreateModel(
            name='Enrollments',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('price', models.PositiveIntegerField(default=0)),
                ('paid', models.BooleanField(default=False)),
                ('start_date', models.DateField(auto_now_add=True)),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='wonderhub.course')),
                ('instructor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='wonderhub.instructor')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='wonderhub.student')),
            ],
        ),
    ]
