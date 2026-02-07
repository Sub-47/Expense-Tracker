import React, { useState, useEffect } from 'react';
import API_BASE from '../config/api';

// Helper to get CSRF token from cookies
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

function AddExpenseForm({ onExpenseAdded }) {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ category: '', amount: '', description: '' });
  const [message, setMessage] = useState('');

  // Fetch categories from backend
  useEffect(() => {
    fetch(`${API_BASE}/categories/`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error('Failed to fetch categories:', err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const csrftoken = getCookie('csrftoken');
      
      const res = await fetch(`${API_BASE}/expenses/add/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken
        },
        body: JSON.stringify(form),
        credentials: 'include'
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to add expense');
      }

      await res.json();
      
      setMessage('Expense added!');
      setForm({ category: '', amount: '', description: '' });

      if (onExpenseAdded) onExpenseAdded();
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Expense</h2>

      <select
        value={form.category}
        onChange={e => setForm({ ...form, category: e.target.value })}
        required
      >
        <option value="">Select Category</option>
        {categories.map(c => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Amount"
        value={form.amount}
        onChange={e => setForm({ ...form, amount: e.target.value })}
        required
      />

      <input
        placeholder="Description"
        value={form.description}
        onChange={e => setForm({ ...form, description: e.target.value })}
      />

      <button type="submit">Add Expense</button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default AddExpenseForm;