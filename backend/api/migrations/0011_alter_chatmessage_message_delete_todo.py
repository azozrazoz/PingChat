# Generated by Django 5.0.1 on 2024-02-13 03:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_chatmessage'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chatmessage',
            name='message',
            field=models.TextField(max_length=1000),
        ),
        migrations.DeleteModel(
            name='Todo',
        ),
    ]
