import React, { useState, useEffect } from 'react';
import API_BASE from '../config/api';
import AddExpenseForm from './Expense.jsx';


function TasksPage() {
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState('');

  // Fetch expenses
  const fetchExpenses = async () => {
    try {
      const res = await fetch(`${API_BASE}/expenses/`, {
        method: 'GET',
        credentials: 'include'
      });

      if (!res.ok) throw new Error('Failed to fetch expenses');

      const data = await res.json();
      setExpenses(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div>
      <h1>Expenses</h1>
      <AddExpenseForm onExpenseAdded={fetchExpenses} />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {expenses.map(e => (
          <li key={e.id}>
            {e.category} - {e.amount} - {e.description || '-'} - {e.date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TasksPage;
