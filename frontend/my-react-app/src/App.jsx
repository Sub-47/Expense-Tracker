import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import RegisterPage from "./pages/Register.jsx";
import LoginPage from "./pages/Login.jsx";
import CategoriesPage from "./pages/Task.jsx";
import AddExpenseForm from "./pages/Expense.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

function App() {
  const username = localStorage.getItem("username");

  return (
    <Router>
      <div>
        <nav style={{ marginBottom: "20px" }}>
          {username && <span>Welcome, {username}! </span>}
          <Link to="/categories" style={{ marginRight: "10px" }}>Categories</Link>
          <Link to="/add-expense" style={{ marginRight: "10px" }}>Add Expense</Link>
          {username && (
            <button onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}>Logout</button>
          )}
        </nav>

        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/categories"
            element={
              <PrivateRoute>
                <CategoriesPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/add-expense"
            element={
              <PrivateRoute>
                <AddExpenseForm />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
