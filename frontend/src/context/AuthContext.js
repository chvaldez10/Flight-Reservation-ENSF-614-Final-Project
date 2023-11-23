import { createContext, useContext, useState } from "react";

// Create a Context for Authentication
export const AuthContext = createContext();

// Custom hook for consuming context
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to provide context
export default function AuthProvider({ children }) {
  const [isAuthenticated, setAuthenticated] = useState(false);

  // Placeholder credentials, consider moving to a constants file
  const DUMMY_USERNAME = "test";
  const DUMMY_PASSWORD = "test";

  // Login function, to be integrated with backend later
  function login(username, password) {
    // Placeholder for future error handling
    try {
      if (username === DUMMY_USERNAME && password === DUMMY_PASSWORD) {
        setAuthenticated(true);
        return true;
      } else {
        setAuthenticated(false);
        return false;
      }
    } catch (error) {
      // Placeholder for error handling logic
      console.error("Login error:", error);
      return false;
    }
  }

  // Logout function
  function logout() {
    setAuthenticated(false);
    // Placeholder for any cleanup logic
  }

  // Context value
  const contextValue = { isAuthenticated, login, logout };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
