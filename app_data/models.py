from django.db import models

# Create your models here.


class DataForm(models.Model):
    name = models.CharField(max_length=64)
    position = models.CharField(max_length=64)
    types = models.CharField(max_length=64)
    date = models.DateField(null=True,blank=True)