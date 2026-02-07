from django.urls import path
from .views import (
    list_categories,
    login_user,
    register_user,
    logout_user,
    list_expenses,
    add_expense,
    delete_expense,
    update_expense,
)

urlpatterns = [
    path('login/', login_user),
    path('register/', register_user),
    path('logout/', logout_user),
    path('categories/', list_categories),
    path('expenses/', list_expenses),      
    path('expenses/add/', add_expense),    
    path('expenses/<int:expense_id>/delete/', delete_expense),
    path('expenses/<int:expense_id>/update/', update_expense),
]
