import React, { useState } from 'react';
import API_BASE from "../config/api";

function LoginPage() {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch(`${API_BASE}/login/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
          credentials: "include"
        });

        console.log('Login response status:', response.status);
        const data = await response.json();
        console.log('Login response data:', data);
        console.log('Cookies after login:', document.cookie);
        
        if (!data.success) throw new Error(data.error || 'Login failed');

        console.log('Login successful! Check the console above.');
        alert('Login successful! click OK to continue');
        window.location.href = '/categories';
      } catch (err) {
        console.error('Login error:', err);
        setError(err.message);
      }
    };

    return (
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input name="username" placeholder="Username" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    );
}

export default LoginPage;