# Generated by Django 5.0.1 on 2024-02-29 12:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0014_alter_chatmessage_message'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chatmessage',
            name='message',
            field=models.CharField(max_length=255),
        ),
    ]
