import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn("Error reading localStorage key “" + key + "”: ", error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn("Error setting localStorage key “" + key + "”: ", error);
    }
  };

  return [storedValue, setValue];
};

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [isAuthenticated, setAuthenticated] = useLocalStorage(
    "isAuthenticated",
    false
  );
  const [username, setUsername] = useLocalStorage("username", "");

  async function login(user, pass) {
    try {
      const response = await axios.get("http://localhost:3001/api/login", {
        params: { username: user, password: pass },
      });

      if (response.status === 200) {
        setAuthenticated(true);
        setUsername(user);
        return true;
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
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
