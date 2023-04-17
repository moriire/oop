from django.contrib import admin
from comment.models import Comments, PostWithComments

admin.site.register(Comments)
#admin.site.register(PostWithComments)