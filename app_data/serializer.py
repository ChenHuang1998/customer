from rest_framework import serializers

from app_data.models import DataForm


class DataFormSerializer(serializers.ModelSerializer):
    date = serializers.DateField(format="%Y-%m-%d", input_formats=['%Y-%m-%d', 'iso-8601'])

    class Meta:
        model = DataForm
        fields = '__all__'
