
from django.urls import path
from rest_framework.routers import DefaultRouter

from app_data import views

router = DefaultRouter()
router.register('data', views.DataInfoViewSet)
urlpatterns = [

]
urlpatterns += router.urls
