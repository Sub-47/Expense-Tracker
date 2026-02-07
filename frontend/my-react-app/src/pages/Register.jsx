import React, { useState } from 'react';
import API_BASE from "../config/api";

function RegisterPage() {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch(`${API_BASE}/register/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
          credentials: "include"  // <--  THIS IS FOR SESSIONS.
      });

      const data = await response.json();
      if (!data.success) throw new Error(data.error);

        setMessage('Registration successful! Redirecting to login...');
        setTimeout(() => (window.location.href = '/login'), 1500);
      } catch (err) {
        setMessage(err.message);
      }
    };


    return (
      <form onSubmit={handleSubmit}>
      <h2>Register</h2>
        <input name="username" placeholder="Username" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Register</button>
      {message && <p>{message}</p>}
      </form>
    );
  }

  export default RegisterPage;