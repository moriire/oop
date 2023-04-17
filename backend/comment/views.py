from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from users.models import Users
from users.serializers import UserSerializer
from rest_framework import permissions
from .models import Comments, XCommentSerializer, CommentSerializer, PostWithComments, PostWithCommentSerializer, XPostWithCommentSerializer
def index(request, **path):
    return render(request, "index.html", {})

class CommentsView(ModelViewSet):
    queryset = Comments.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request):
        items = self.get_queryset()
        params = request.query_params
        if params:
            items=items.filter(post__id=params.get("post"))
        ser =XCommentSerializer(items, many=True)
        return Response(ser.data)

class PostWithCommentsView(ModelViewSet):
    queryset = PostWithComments.objects.all()
    serializer_class = XPostWithCommentSerializer