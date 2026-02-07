from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Expense, Category

# -----------------------------
# Authentication APIs
# -----------------------------
#ts is for delete
@api_view(['DELETE'])
def delete_expense(request, expense_id):
    if not request.user.is_authenticated:
        return Response({'success': False, 'error': 'Not authenticated'}, status=401)
    
    try:
        expense = Expense.objects.get(id=expense_id, user=request.user)
        expense.delete()
        return Response({'success': True, 'message': 'Expense deleted'})
    except Expense.DoesNotExist:
        return Response({'success': False, 'error': 'Expense not found'}, status=404)


# Login API
@ensure_csrf_cookie  # Ensures CSRF cookie is set for session-based auth
@api_view(['POST'])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    user = authenticate(username=username, password=password)
    if user:
        login(request, user)
        return Response({'success': True})
    
    return Response({'success': False, 'error': 'Invalid credentials'})


# Register API
@api_view(['POST'])
def register_user(request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    if User.objects.filter(username=username).exists():
        return Response({'success': False, 'error': 'Username exists'})
    
    user = User.objects.create_user(username=username, password=password)
    return Response({'success': True})


# Logout API
@api_view(['POST'])
def logout_user(request):
    logout(request)
    return Response({'success': True})


# -----------------------------
# Category APIs
# -----------------------------

# List all categories
@api_view(['GET'])
def list_categories(request):
    categories = Category.objects.all()
    data = [{"id": c.id, "name": c.name} for c in categories]
    return Response(data)


# -----------------------------
# Expense APIs
# -----------------------------

# Add a new expense
@api_view(['POST'])
def add_expense(request):
    if not request.user.is_authenticated:
        return Response({'error': 'Not authenticated'}, status=401)
    
    category_id = request.data.get('category')
    amount = request.data.get('amount')
    description = request.data.get('description', '')

    # Validate category
    try:
        category = Category.objects.get(id=category_id)
    except Category.DoesNotExist:
        return Response({'error': 'Category not found'}, status=404)

    # Create expense
    expense = Expense.objects.create(
        user=request.user,
        category=category,
        amount=amount,
        description=description
    )

    return Response({
        'success': True,
        'expense': {
            'id': expense.id,
            'category': expense.category.name,
            'amount': expense.amount,
            'description': expense.description,
            'date': expense.date
        }
    })


# List all expenses for logged-in user
@api_view(['GET'])
def list_expenses(request):
    if not request.user.is_authenticated:
        return Response({'error': 'Not authenticated'}, status=401)

    expenses = Expense.objects.filter(user=request.user)
    data = [
        {
            'id': e.id,
            'category': e.category.name,
            'amount': e.amount,
            'description': e.description,
            'date': e.date
        } 
        for e in expenses
    ]
    return Response(data)


# -----------------------------
# Task API (placeholder)
# -----------------------------

# List tasks (currently empty)
@api_view(['GET'])
def list_tasks(request):
    if not request.user.is_authenticated:
        return Response({'error': 'Not authenticated'}, status=401)
    
    return Response({
        'success': True,
        'tasks': []
    })


@api_view(['PUT'])
def update_expense(request, expense_id):
    if not request.user.is_authenticated:
        return Response({'success': False, 'error': 'Not authenticated'}, status=401)
    
    try:
        expense = Expense.objects.get(id=expense_id, user=request.user)
        
        # Update fields
        category_id = request.data.get('category')
        if category_id:
            try:
                category = Category.objects.get(id=category_id)
                expense.category = category
            except Category.DoesNotExist:
                return Response({'success': False, 'error': 'Category not found'}, status=404)
        
        if 'amount' in request.data:
            expense.amount = request.data.get('amount')
        
        if 'description' in request.data:
            expense.description = request.data.get('description')
        
        expense.save()
        
        return Response({
            'success': True,
            'expense': {
                'id': expense.id,
                'category': expense.category.name,
                'amount': expense.amount,
                'description': expense.description,
                'date': expense.date
            }
        })
    except Expense.DoesNotExist:
        return Response({'success': False, 'error': 'Expense not found'}, status=404)