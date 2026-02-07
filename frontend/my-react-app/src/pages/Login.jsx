import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API_BASE from "../config/api";

function getCookie(name) {
  let value = null;
  document.cookie?.split(";").forEach(cookie => {
    const trimmed = cookie.trim();
    if (trimmed.startsWith(name + "=")) {
      value = decodeURIComponent(trimmed.slice(name.length + 1));
    }
  });
  return value;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const username = localStorage.getItem("username");

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCookie("csrftoken")
        },
        credentials: "include",
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!data.success) throw new Error(data.error || "Login failed");

      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("username", formData.username);

      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <nav style={{ marginBottom: "20px" }}>
        {username && <span>Welcome, {username}!</span>}
        <Link to="/categories" style={{ marginRight: "10px" }}>Categories</Link>
        <Link to="/add-expense" style={{ marginRight: "10px" }}>Add Expense</Link>
        {username && (
          <button
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
          >
            Logout
          </button>
        )}
      </nav>

      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input name="username" placeholder="Username" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </>
  );
}
