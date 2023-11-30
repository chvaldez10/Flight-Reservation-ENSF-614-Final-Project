import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Import your page components
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Flight from "./pages/flight/Flight";
import Admin from "./pages/admin/Admin";
import Staff from "./pages/staff/Staff";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Seatmap from "./pages/seatmap/Seatmap";
import Checkout from "./pages/checkout/Checkout";
import ErrorComponent from "./components/error/ErrorComponent";

import AuthProvider, { useAuth } from "./context/AuthContext";

function AuthenticatedRoute({ children }) {
  const authContext = useAuth();

  if (!authContext.isAuthenticated) {
    return <Navigate to="/login" />;
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

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Route for the login page */}
          <Route path="/login" element={<Login />} />

          {/* Route for the register page*/}
          <Route path="/register" element={<Register />} />

          {/* Route for the home page */}
          <Route path="/" element={<Home />} />

          {/* Route for the flights list page */}
          <Route path="/flights" element={<List />} />

          {/* Route for the checkout page */}
          <Route path="/checkout" element={<Checkout />} />

          {/* Route for the flights list page */}
          <Route path="/seatmap" element={<Seatmap />} />

          {/* Route for individual flight details, using a dynamic segment :id */}
          <Route path="/flights/:id" element={<Flight />} />

          {/* Route for the admin page, wrapped in AuthenticatedRoute */}
          <Route
            path="/admin"
            element={
              <AuthenticatedRoute>
                <Admin />
              </AuthenticatedRoute>
            }
          />

          {/* Route for the staff page, wrapped in AuthenticatedRoute */}
          <Route
            path="/staff"
            element={
              <AuthenticatedRoute>
                <Staff />
              </AuthenticatedRoute>
            }
          />

          {/* Catch-all route for unmatched paths */}
          <Route path="*" element={<ErrorComponent />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
