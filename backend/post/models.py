from django.db import models
from users.models import Users
from category.models import Category, CatSerializer
from rest_framework import serializers#.viewsets import ModelViewSet
from users.serializers import UserSerializer

class Posts(models.Model):
    posted_by = models.ForeignKey(Users, on_delete=models.CASCADE)
    program = models.ForeignKey(Category, on_delete=models.CASCADE)
    title = models.CharField(max_length=128)
    body = models.TextField(max_length=1024)
    uploaded_on = models.DateTimeField(auto_now_add = True)

    def __str__(self):
        return self.posted_by.username

class PostSerializer(serializers.ModelSerializer):
    class Meta:   
        model = Posts
        fields = "__all__"

class XPostSerializer(serializers.ModelSerializer):
    posted_by = UserSerializer()
    program = CatSerializer()
    class Meta:   
        model = Posts
        fields = "__all__"