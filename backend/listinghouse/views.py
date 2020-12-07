from django.shortcuts import render
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.views import APIView
from .serializers import ListingsSerializers, ListingsDetailSerializers
from .models import Listings
from datetime import timezone, datetime, timedelta
from rest_framework import permissions
from rest_framework.response import Response
import json
from django.http import JsonResponse


class ListingsView(ListAPIView):
    queryset = Listings.objects.order_by(
        '-list_date').filter(is_published=True)
    permission_classes = (permissions.AllowAny,)
    serializer_class = ListingsSerializers
    lookup_field = 'slug'


class ListingDetailView(RetrieveAPIView):
    queryset = Listings.objects.order_by(
        '-list_date').filter(is_published=True)
    permission_classes = (permissions.AllowAny,)
    serializer_class = ListingsDetailSerializers
    lookup_field = 'slug'


class SearchView(APIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = ListingsSerializers

    def post(self, request, format=None):
        queryset = Listings.objects.order_by(
            '-list_date').filter(is_published=True)
        data = request.data
        sale_type = data['sale_type']

        queryset = queryset.filter(sale_type__iexact=sale_type)

        # print('coming_data', request.data)

        try:
            price = request.data["price"]

        except Exception as err:
            print('err', err)

        if price == '$0+':
            price = 0
        elif price == '$200,000+':
            price = 200000
        elif price == '$400,000+':
            price = 400000
        elif price == '$600,000+':
            price = 600000
        elif price == '$800,000+':
            price = 800000
        elif price == '$1000,000+':
            price = 1000000
        elif price == '$1200,000+':
            price = 1200000
        elif price == '$1500,000+':
            price = 1500000
        elif price == 'Any':
            price = -1

        if price != -1:
            queryset = queryset.filter(price__gte=price)
        print('price', price)
        print('has_photos', queryset)
        bathrooms = data['bathrooms']
        if bathrooms == '0+':
            bathrooms = 0.0

        elif bathrooms == '1+':
            bathrooms = 1.0
        elif bathrooms == '2+':
            bathrooms = 2.0
        elif bathrooms == '3+':
            bathrooms = 3.0
        elif bathrooms == '4+':
            bathrooms = 4.0
        elif bathrooms == '5+':
            bathrooms = 5.0
        print('bathrooms', bathrooms)

        queryset = queryset.filter(bathrooms__gte=bathrooms)
        print('bathrooms after bathrooms', queryset)
        bedrooms = data['bedrooms']
        if bedrooms == '0+':
            bedrooms = 0

        elif bedrooms == '1+':
            bedrooms = 1
        elif bedrooms == '2+':
            bedrooms = 2
        elif bedrooms == '3+':
            bedrooms = 3
        elif bedrooms == '4+':
            bedrooms = 4
        elif bedrooms == '5+':
            bedrooms = 5
        print('bedrooms', bedrooms)

        queryset = queryset.filter(bathrooms__gte=bedrooms)
        print('queryset after bedrooms', queryset)
        house_type = data['house_type']
        queryset = queryset.filter(house_type__iexact=house_type)

        sqft = data['sqft']
        if sqft == '1200+':
            sqft = 1200
        elif sqft == '1000+':
            sqft = 1000
        elif sqft == '1400+':
            sqft = 1400
        elif sqft == '1500+':
            sqft = 1500
        elif sqft == '1700+':
            sqft = 1700
        elif sqft == '2000+':
            sqft = 2000
        elif sqft == 'Any':
            sqft = -1
        print('sqft', sqft)
        print('has_photos', queryset)
        if sqft != 'Any':
            queryset = queryset.filter(sqft__gte=sqft)

        days_of_passed = data['days_listed']
        if days_of_passed == '1 or less':
            days_of_passed = 1

        elif days_of_passed == '2 or less':
            days_of_passed = 2
        elif days_of_passed == '5 or less':
            days_of_passed = 5
        elif days_of_passed == '10 or less':
            days_of_passed = 10
        elif days_of_passed == '20 or less':
            days_of_passed = 20
        elif days_of_passed == 'Any':
            days_of_passed = 0
        print('days_of_passed', days_of_passed)

        for query in queryset:
            num_days = (datetime.now(timezone.utc)-query.list_date).days
            print('num_days', num_days, query.slug)
            if days_of_passed != 0:
                if num_days > days_of_passed:
                    slug = query.slug
                    queryset = queryset.exclude(slug__iexact=slug)
        print('after has_photos', queryset)
        has_photos = data['has_photos']
        if has_photos == '1+':
            has_photos = 1
        elif has_photos == '3+':
            has_photos = 3
        elif has_photos == '5+':
            has_photos = 5
        elif has_photos == '10+':
            has_photos = 10
        elif has_photos == '15+':
            has_photos = 15
        print('has_photos', has_photos)
        print('queryset after has photos', queryset)
        for query in queryset:
            counter = 0
            if query.photo_1:
                counter += 1
            if query.photo_2:
                counter += 1
            if query.photo_3:
                counter += 1
            if query.photo_4:
                counter += 1
            if query.photo_5:
                counter += 1
            if query.photo_6:
                counter += 1
            if query.photo_7:
                counter += 1
            if query.photo_8:
                counter += 1
            if query.photo_9:
                counter += 1
            if query.photo_10:
                counter += 1
            if query.photo_11:
                counter += 1
            if query.photo_12:
                counter += 1
            if query.photo_13:
                counter += 1
            if query.photo_14:
                counter += 1
            if query.photo_15:
                counter += 1
            if query.photo_16:
                counter += 1
            if query.photo_17:
                counter += 1
            if query.photo_18:
                counter += 1
            if query.photo_19:
                counter += 1
            if query.photo_20:
                counter += 1
            if counter < has_photos:
                slug = query.slug
                queryset = queryset.exclude(slug__iexact=slug)
            print('counter', counter)

        open_house = data['open_house']
        queryset = queryset.filter(open_house=open_house)

        keywords = data['keywords']
        Queryset = queryset.filter(description__icontains=keywords)
        for query in Queryset:
            print('queryset_types', (query))

        serializer = ListingsSerializers(Queryset, many=True)

        # serializer.is_valid(raise_exception=True)
        # except Exception as err:
        #     print('error of serializer', err)

        return Response(serializer.data)

        #JsonResponse({"models_to_return": list(Queryset)})
        # return Response(serializer.initial_data)
        # ??????????????????????????????????????????????????????????
