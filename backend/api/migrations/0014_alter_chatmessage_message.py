# Generated by Django 5.0.2 on 2024-02-28 12:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0013_alter_chatmessage_message'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chatmessage',
            name='message',
            field=models.CharField(),
        ),
    ]
