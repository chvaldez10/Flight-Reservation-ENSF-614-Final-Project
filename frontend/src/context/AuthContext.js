import { createContext, useContext } from "react";
import { useLocalStorage } from "./useLocalStorage"; // Import useLocalStorage from its own file
import { loginUser } from "./loginUser"; // Import loginUser from its own file

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [isAuthenticated, setAuthenticated] = useLocalStorage(
    "isAuthenticated",
    false
  );
  const [username, setUsername] = useLocalStorage("username", "");
  const [userRole, setUserRole] = useLocalStorage("userRole", "");

  async function login(user, pass, selectedRole) {
    const loginResult = await loginUser(user, pass, selectedRole);
    if (loginResult.success) {
      setAuthenticated(true);
      setUsername(user);
      setUserRole(loginResult.role);
    } else {
      setAuthenticated(false);
      setUsername("");
      setUserRole("");
    }
    return loginResult.success;
  }

  function logout() {
    setAuthenticated(false);
    setUsername("");
    setUserRole("");
  }

  const contextValue = { isAuthenticated, username, userRole, login, logout };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
