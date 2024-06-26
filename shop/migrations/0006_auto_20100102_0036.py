# Generated by Django 3.2.13 on 2010-01-01 23:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0005_alter_cart_customer'),
    ]

    operations = [
        migrations.RenameField(
            model_name='cart',
            old_name='shipping_address',
            new_name='delivery_address',
        ),
        migrations.AddField(
            model_name='cart',
            name='email',
            field=models.EmailField(blank=True, max_length=254, null=True),
        ),
        migrations.AddField(
            model_name='cart',
            name='full_name',
            field=models.CharField(blank=True, max_length=300, null=True),
        ),
        migrations.AddField(
            model_name='cart',
            name='lga',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='cart',
            name='phone_number',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AddField(
            model_name='cart',
            name='state',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
