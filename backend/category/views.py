from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Category, CatSerializer

class CategoryView(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CatSerializer
# Create your views here.
