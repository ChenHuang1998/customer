from rest_framework import serializers

from app_data.models import DataForm


class DataFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = DataForm
        fields = '__all__'
