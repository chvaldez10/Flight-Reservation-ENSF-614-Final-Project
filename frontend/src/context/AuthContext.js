import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  // Initialize state from localStorage
  const [isAuthenticated, setAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );

  useEffect(() => {
    // Save state to localStorage when it changes
    localStorage.setItem("isAuthenticated", isAuthenticated);
    localStorage.setItem("username", username);
  }, [isAuthenticated, username]);

  const DUMMY_USERNAME = "test";
  const DUMMY_PASSWORD = "test";

  function login(user, pass) {
    if (user === DUMMY_USERNAME && pass === DUMMY_PASSWORD) {
      setAuthenticated(true);
      setUsername(user);
      return true;
    } else {
      setAuthenticated(false);
      setUsername("");
      return false;
    }
  }

  function logout() {
    setAuthenticated(false);
    setUsername("");
  }

  const contextValue = { isAuthenticated, username, login, logout };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
