# Generated by Django 4.1.5 on 2023-04-22 10:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('nimic', '0006_episodeupload'),
    ]

    operations = [
        migrations.AddField(
            model_name='episode',
            name='is_free',
            field=models.BooleanField(default=True),
        ),
    ]
