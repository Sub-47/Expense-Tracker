import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import RegisterPage from "./pages/Register.jsx";
import LoginPage from './pages/Login.jsx';
import CategoriesPage from "./pages/Task.jsx";
import AddExpenseForm from "./pages/Expense.jsx";
import { handleLogout } from "./services/api.jsx";

function App() {
  return (
    <Router>
      <div>
        
        <nav style={{ marginBottom: "20px" }}>
          <Link to="/categories" style={{ marginRight: "10px" }}>Categories</Link>
          <Link to="/add-expense" style={{ marginRight: "10px" }}>Add Expense</Link>
          <button onClick={handleLogout}>Logout</button>
        </nav>

        
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/add-expense" element={<AddExpenseForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
