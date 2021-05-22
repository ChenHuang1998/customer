from rest_framework import serializers

from app_data.models import DataForm
from django_filters import rest_framework

class DataFormSerializer(serializers.ModelSerializer):
    date = serializers.DateField(format="%Y%m%d", input_formats=['%Y%m%d', 'iso-8601'])

    class Meta:
        model = DataForm
        fields = '__all__'


class DataFormFilter(rest_framework.FilterSet):
    date = rest_framework.DateFilter(input_formats=['%Y%m%d', 'iso-8601'])

    class Meta:
        model = DataForm
        fields = '__all__'
