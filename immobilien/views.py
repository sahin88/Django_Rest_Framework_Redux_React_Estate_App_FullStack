from rest_framework import permissions
from rest_framework.generics import ListAPIView, RetrieveAPIView
from django.shortcuts import render
from .models import immobilien
from.serializers import immobilienSerializer


class immobilienListView(ListAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset = immobilien.objects.all()
    serializer_class = immobilienSerializer
    pagination_class = None


class immobilienRetrieve(RetrieveAPIView):
    permission_classes = (permissions.AllowAny,)
    lookup_field = 'id'
    queryset = immobilien.objects.all()
    serializer_class = immobilienSerializer
    pagination_class = None


class TopSellerView(ListAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset = immobilien.objects.filter(topseller=True)
    serializer_class = immobilienSerializer
    pagination_class = None
