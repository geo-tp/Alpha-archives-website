# Generated by Django 3.2.7 on 2021-12-13 01:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('element', '0003_auto_20211213_0044'),
    ]

    operations = [
        migrations.AlterField(
            model_name='element',
            name='name',
            field=models.CharField(max_length=2000),
        ),
        migrations.AlterField(
            model_name='hash_image',
            name='image_path',
            field=models.CharField(max_length=2000),
        ),
    ]
