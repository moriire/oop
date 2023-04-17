from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from rest_framework.viewsets import GenericViewSet
from rest_framework.response import Response
from .models import Users
#from .serializers import UserSerializer

from rest_framework import filters

def index(request, **kw):
    return render(request, "users/index.html", {})

def privacy_policy(request):
    return render(request, "account/verification_success.html", {})

def terms_of_service(request):
    return render(request, "account/verification_success.html", {})

def account_delete(request):
    return render(request, "account/verification_success.html", {})


def email_verified(request):
    return render(request, "account/verification_success.html", {})

"""
class UsersView(GenericViewSet):

    serializer_class = UsersSerializer
    queryset = CustomUsers.objects.all()
    filter_backends = [filters.SearchFilter]
    search_fields = ['email']


"""

from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView

class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter



from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView

class GoogleLogin(SocialLoginView): # if you want to use Authorization Code Grant, use this
    adapter_class = GoogleOAuth2Adapter
    callback_url = "/auth/google/login/callback/"#CALLBACK_URL_YOU_SET_ON_GOOGLE
    client_class = OAuth2Client
"""
class GoogleLogin(SocialLoginView): # if you want to use Implicit Grant, use this
    adapter_class = GoogleOAuth2Adapter

"""


from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView

class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter

