from django.db import models
from rest_framework.serializers import ModelSerializer

class Category(models.Model):
    name = models.CharField(max_length=30)
    desc = models.TextField(blank=True, null=True)
    def __str__(self):
        return self.name
    
class CatSerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"
        
# Create your models here.
