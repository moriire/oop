from django.db import models
from users.models import Users
from rest_framework import serializers#.viewsets import ModelViewSet
from users.serializers import UserSerializer
from post.models import PostSerializer, XPostSerializer, Posts

class Comments(models.Model):
    comment_by = models.ForeignKey(Users, on_delete=models.CASCADE)
    post = models.ForeignKey(Posts, on_delete=models.CASCADE)
    body = models.TextField(max_length=1024)
    created_on = models.DateTimeField(auto_now_add = True)

    def __str__(self) -> str:
        return self.comment_by.username

class CommentSerializer(serializers.ModelSerializer):
    #uploaded_by = UserSerializer()
    class Meta:   
        model = Comments
        fields = "__all__"

class XCommentSerializer(serializers.ModelSerializer):
    comment_by = UserSerializer()
    post = XPostSerializer()
    class Meta:   
        model = Comments
        fields = "__all__"

class PostWithComments(models.Model):
    post = models.ForeignKey(Posts, on_delete=models.CASCADE, related_name="post+")
    comments = models.ManyToManyField(Comments, related_name="postcom+", blank=True)

    def __str__(self) -> str:
        return self.post.posted_by.username

class PostWithCommentSerializer(serializers.ModelSerializer):
    class Meta:   
        model = PostWithComments
        fields = "__all__"

class XPostWithCommentSerializer(serializers.ModelSerializer):
    comments = XCommentSerializer(many=True)
    post = XPostSerializer()
    class Meta:   
        model = PostWithComments
        fields = "__all__"
