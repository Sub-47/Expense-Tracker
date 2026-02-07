import API_BASE from "../config/api";

// Register User
export const registerUser = async (userData) => {
  const res = await fetch(`${API_BASE}/register/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
    credentials: "include"
});
const data = await res.json();
if (!data.success) throw new Error(data.error);
  return data;
};

// Login User
export const loginUser = async (credentials) => {
  const res = await fetch(`${API_BASE}/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
    credentials: "include"
});
const data = await res.json();
if (!data.success) throw new Error(data.error);
  return data;
};

// Get Categories
export const getCategories = async () => {
  const res = await fetch(`${API_BASE}/categories/`, {
    method: 'GET',
    credentials: "include"
});
if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
};

function handleLogout() {
  fetch(`${API_BASE}/logout/`, { method: 'POST', credentials: 'include' }) // optional
    .finally(() => {
      window.location.href = '/login'; // redirect to login
    });
}

<button onClick={handleLogout}>Logout</button>

export { handleLogout };
