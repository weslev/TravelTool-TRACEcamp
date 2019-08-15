from django.db import models

# Create your models here.
class Comment(models.Model):
    country = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    body = models.CharField(max_length=300)