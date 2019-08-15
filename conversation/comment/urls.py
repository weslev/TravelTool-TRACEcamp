from django.contrib import admin
from django.urls import path, include
from comment.views import comments_view

urlpatterns = [
    path("comments/", comments_view)
]
