# Generated by Django 4.1.5 on 2023-09-29 00:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('wonderhub', '0014_bankaccount'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bankaccount',
            name='instructor',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='bank_accounts', to='wonderhub.instructor'),
        ),
    ]
