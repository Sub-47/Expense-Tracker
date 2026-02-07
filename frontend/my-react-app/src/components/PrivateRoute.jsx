import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isAuthenticated");

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
