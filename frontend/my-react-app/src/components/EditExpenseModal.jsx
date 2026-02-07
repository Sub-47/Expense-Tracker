import React, { useState } from 'react';
import API_BASE from '../config/api';

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

function EditExpenseModal({ expense, categories, onClose, onUpdate }) {
  const [form, setForm] = useState({
    category: expense.category_id || '',
    amount: expense.amount || '',
    description: expense.description || ''
  });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const csrftoken = getCookie('csrftoken');
      const res = await fetch(`${API_BASE}/expenses/${expense.id}/update/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken
        },
        body: JSON.stringify(form),
        credentials: 'include'
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to update expense');
      }

      setMessage('Expense updated!');
      setTimeout(() => {
        onUpdate();
        onClose();
      }, 1000);
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        minWidth: '300px'
      }}>
        <h2>Edit Expense</h2>
        <form onSubmit={handleSubmit}>
          <select
            value={form.category}
            onChange={e => setForm({ ...form, category: e.target.value })}
            required
            style={{ width: '100%', marginBottom: '10px', padding: '5px' }}
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
            style={{ width: '100%', marginBottom: '10px', padding: '5px' }}
          />

          <input
            placeholder="Description"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            style={{ width: '100%', marginBottom: '10px', padding: '5px' }}
          />

          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit">Update</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
          {message && <p>{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default EditExpenseModal;