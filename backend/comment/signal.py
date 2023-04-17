from users.models import Users
from django.db.models.signals import post_save
from django.dispatch import receiver

from post.models import Posts

from comment.models import Comments, PostWithComments

@receiver(post_save, sender = Posts)
def create_user_postwithcommentsforPost(sender, instance, created, **kwargs):
    if created:
        PostWithComments.objects.create(post=instance)

@receiver(post_save, sender = Comments)
def create_user_postwithcommentsforComments(sender, instance, created, **kwargs):
    if created:
        getpost = PostWithComments.objects.get(post=instance.post.id)
        getpost.comments.add(instance)

