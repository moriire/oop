from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, re_path, include
from rest_framework.routers import DefaultRouter
from users import views as users_views
from category.views import CategoryView
from post.views import PostsView
from django.shortcuts import render
from comment.views import CommentsView, PostWithCommentsView
from rest_framework import permissions
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
#from rest_framework.schemas import get_schema_view

from rest_framework.documentation import include_docs_urls






# Swagger documentation setup
schema_view = get_schema_view(                        
                openapi.Info(
                title="OOP API Snippets",
                default_version='v1.0.1',
                description="Programmers' Discuss or forum",
                website="/",
                terms_of_service="/terms_of_services/",
                privacy_policy="/privacy_policy/",
                contact=openapi.Contact(email="ibmabdulsalam@gmail.com",
                    phone = "+2348100482341"),                                           
                license = openapi.License(name="MIT License"),                                                    ),                                                public=True,
    permission_classes=[permissions.AllowAny],
)




router = DefaultRouter()
router.register("posts", PostsView)
router.register("comments", CommentsView)
router.register("categories", CategoryView)
def index(request, **r):
    return render(request, "index.html", {})
urlpatterns = [
    re_path(r"^v1/api/", include(router.urls)),
    path('v1/api/auth/', include('dj_rest_auth.urls')),
    re_path(r'^admin/', admin.site.urls),
    path('v1/api/auth/signup/', include('dj_rest_auth.registration.urls')),
    path("", index, name="index"),
    path("<str:page1>/<str:page2>", index, name="index-2"),
    re_path(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]

if settings.DEBUG:
    urlpatterns = urlpatterns + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns = urlpatterns + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
