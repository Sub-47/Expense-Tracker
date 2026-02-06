from django.urls import path
from . import views
from .views import list_categories,login_user,register_user
urlpatterns = [
    path('login/', views.login_user),
    path('register/', views.register_user),
    path('categories/', list_categories),
]
