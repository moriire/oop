# Generated by Django 4.0.6 on 2023-04-17 19:26

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('post', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Comments',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('body', models.TextField(max_length=1024)),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('comment_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('post', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='post.posts')),
            ],
        ),
        migrations.CreateModel(
            name='PostWithComments',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('comments', models.ManyToManyField(blank=True, related_name='postcom+', to='comment.comments')),
                ('post', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='post+', to='post.posts')),
            ],
        ),
    ]
