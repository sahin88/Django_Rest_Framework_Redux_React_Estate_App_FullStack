
from django.urls import path, include
from .views import immobilienListView, immobilienRetrieve, TopSellerView


urlpatterns = [
    path('',  immobilienListView.as_view()),
    path('<id>/', immobilienRetrieve.as_view()),
    path('topseller/', TopSellerView.as_view()),
]
