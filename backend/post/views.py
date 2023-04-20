from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from users.models import Users
from users.serializers import UserSerializer
from .models import Posts, PostSerializer, XPostSerializer
from rest_framework import permissions

def index(request, **path):
    return render(request, "index.html", {})

class PostsView(ModelViewSet):
    queryset = Posts.objects.all().select_related()
    serializer_class = PostSerializer
    permission_classes=[permissions.IsAuthenticated,]

    def list(self, request):
        items = self.get_queryset()
        params = request.query_params
        print(params)
        if params:
            items=items.filter(program=params.get("program"))
        ser = XPostSerializer(items, many=True)
        return Response(ser.data)
