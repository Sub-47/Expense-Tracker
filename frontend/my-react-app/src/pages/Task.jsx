import React, { useState, useEffect } from 'react';
import API_BASE from '../config/api';
import AddExpenseForm from './Expense.jsx';
import EditExpenseModal from '../components/EditExpenseModal.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        document.cookie.split(';').forEach(cookie => {
          cookie = cookie.trim();
          if (cookie.startsWith(name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
            }
        });
      }
      return cookieValue;
    }

    function TasksPage() {
        const [expenses, setExpenses] = useState([]);
        const [categories, setCategories] = useState([]);
        const [error, setError] = useState('');
        const [loading, setLoading] = useState(false);
        const [editingExpense, setEditingExpense] = useState(null);

        const fetchExpenses = async () => {
          setLoading(true);
          try {
            const res = await fetch(`${API_BASE}/expenses/`, {
              method: 'GET',
              credentials: 'include'
          });

          if (!res.ok) throw new Error('Failed to fetch expenses');

            const data = await res.json();
            setExpenses(data);
            setError('');
          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        };

        const fetchCategories = async () => {
          try {
            const res = await fetch(`${API_BASE}/categories/`, {
              credentials: 'include'
          });
          const data = await res.json();
          setCategories(data);
        } catch (err) {
          console.error('Failed to fetch categories:', err);
        }
      };

      const handleDelete = async (expenseId) => {
        if (!window.confirm('Are you sure you want to delete this expense?')) {
            return;
          }

          try {
            const csrftoken = getCookie('csrftoken');
            const res = await fetch(`${API_BASE}/expenses/${expenseId}/delete/`, {
              method: 'DELETE',
              headers: {
                'X-CSRFToken': csrftoken
              },
              credentials: 'include'
          });

          if (!res.ok) throw new Error('Failed to delete expense');

            fetchExpenses();
          } catch (err) {
            setError(err.message);
          }
        };

        useEffect(() => {
          fetchExpenses();
          fetchCategories();
        }, []);

        const total = expenses.reduce((sum, e) => sum + parseFloat(e.amount), 0);

        return (
          <div>
          <h1>Expenses</h1>
            <AddExpenseForm onExpenseAdded={fetchExpenses} />

            <ErrorMessage error={error} onClose={() => setError('')} />



            <h2>Total: ${total.toFixed(2)}</h2>
              {loading ? <LoadingSpinner /> : (
                <ul>
                  {expenses.map(e => (
                    <li key={e.id}>
                    <strong>{e.category}</strong> - ${parseFloat(e.amount).toFixed(2)} -
                      {e.description || '-'} -
                      {new Date(e.date).toLocaleDateString()}
                      <button onClick={() => setEditingExpense(e)} style={{ marginLeft: '10px' }}>
                        Edit
                      </button>
                      <button onClick={() => handleDelete(e.id)} style={{ marginLeft: '10px' }}>
                        Delete
                      </button>
                    </li>
              ))}
            </ul>
        )}

        {editingExpense && (
          <EditExpenseModal
          expense={editingExpense}
          categories={categories}
          onClose={() => setEditingExpense(null)}
          onUpdate={fetchExpenses}
          />
      )}
    </div>
  );
}

export default TasksPage;