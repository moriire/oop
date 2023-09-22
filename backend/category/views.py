from django.shortcuts import render, HttpResponse
from rest_framework.viewsets import ModelViewSet
from .models import Category, CatSerializer

class CategoryView(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CatSerializer