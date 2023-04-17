from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils.translation import gettext as _
from django.utils import timezone
from .manager import UserManager
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework import serializers
import uuid
import profile
#from profile.models import Profile
class Users(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(primary_key = True, default = uuid.uuid4, editable = False) 
    username = models.CharField(_("username"), unique=True, max_length=30)
    email = models.EmailField(_("email address"), unique=True,)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)
    profile_pic = models.CharField(max_length=250, null=True, blank=True)
    gender = models.CharField(_("Gender"), max_length=3, blank=True, null=True)
    objects = UserManager()

    USERNAME_FIELD = "username"

    REQUIRED_FIELDS = ["email" ]

    def __str__(self):
        return self.email


    def absolute_url(self):
        return reverse('flash-detail', args=(self.id,))

    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"
 
from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import UserDetailsSerializer

class CustomRegisterSerializer(RegisterSerializer):
    GENDER=(
            ("M", "M"),
            ("F", "F"),
            ("Tx", "Tx"),
            )
    pk = serializers.CharField(read_only=True)
    #first_name = serializers.CharField(required=True)#, write_only=True)
    #last_name = serializers.CharField(required=True)
    #phone = serializers.CharField(required=False)
    #dob = serializers.DateField(required=False)
    profile_pic = serializers.CharField(required=False)
    #gender = serializers.CharField(required=True)

class UserDetailsSerializer(UserDetailsSerializer):
    class Meta:   
        model = Users
        fields = ["pk", "email", "username", "profile_pic"]
