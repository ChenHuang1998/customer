from django.shortcuts import render
from rest_framework import viewsets
from app_data.models import DataForm
from app_data.serializer import DataFormSerializer

# import random
# lst = []
# for i in range(1000):
#     lst.append(DataForm(name=random.randint(0,1000),position=random.randint(0,1000),types=random.randint(0,1000)))
# DataForm.objects.bulk_create(lst)


def home(request):
    return render(request, 'app_data/home.html')


class DataInfoViewSet(viewsets.ModelViewSet):
    queryset = DataForm.objects.all()
    serializer_class = DataFormSerializer
    filter_fields = ('name', 'position', 'types', 'date',)
