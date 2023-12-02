import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

// Import your page components
import Home from "./pages/home/Home";
import SimpleFlight from "./pages/flight/SimpleFlight.jsx";
import Admin from "./pages/admin/Admin.jsx";
import Staff from "./pages/staff/Staff.jsx";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";
import Seatmap from "./pages/seatmap/Seatmap.jsx";
import Checkout from "./pages/checkout/Checkout.jsx";
import Cancel from "./pages/cancel/Cancel.jsx";
import Rewards from "./pages/rewards/Rewards.jsx";
import ErrorComponent from "./components/error/ErrorComponent";

function AuthenticatedRoute({ children, allowedRoles }) {
  const { isAuthenticated, userRole } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" />;
  }

  return children;
}

function PublicRoute({ children }) {
  const authContext = useAuth();

  if (authContext.isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
}

const AppRoutes = () => (
  <Routes>
    <Route
      path="/login"
      element={
        <PublicRoute>
          <Login />
        </PublicRoute>
      }
    />
    <Route
      path="/register"
      element={
        <PublicRoute>
          <Register />
        </PublicRoute>
      }
    />
    <Route path="/" element={<Home />} />
    <Route path="/flights" element={<SimpleFlight />} />
    <Route path="/flights/:id" element={<SimpleFlight />} />
    <Route path="/seatmap" element={<Seatmap />} />
    <Route path="/checkout" element={<Checkout />} />
    <Route path="/cancel" element={<Cancel />} />
    <Route path="/rewards" element={<Rewards />} />
    <Route
      path="/admin"
      element={
        <AuthenticatedRoute allowedRoles={["admin"]}>
          <Admin />
        </AuthenticatedRoute>
      }
    />
    <Route
      path="/staff"
      element={
        <AuthenticatedRoute allowedRoles={["admin", "agent"]}>
          <Staff />
        </AuthenticatedRoute>
      }
    />
    <Route path="*" element={<ErrorComponent />} />
  </Routes>
);

export default AppRoutes;
