from rest_framework import serializers
from .models import Listings


class ListingsSerializers(serializers.ModelSerializer):
    class Meta:
        model = Listings
        fields = ('title', 'adress', 'city', 'state', 'price', 'house_type', 'sqft', 'open_house',
                  'sale_type', 'photo_main', 'bathrooms', 'bedrooms', 'photo_main', 'slug')


class ListingsDetailSerializers(serializers.ModelSerializer):
    class Meta:
        model = Listings
        fields = '__all__'
        lookup_field = 'slug'
