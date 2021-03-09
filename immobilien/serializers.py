from rest_framework import serializers
from .models import immobilien
#from.serializers import  immobilienSerializer


class immobilienSerializer(serializers.ModelSerializer):
    class Meta:
        model = immobilien
        fields = '__all__'
