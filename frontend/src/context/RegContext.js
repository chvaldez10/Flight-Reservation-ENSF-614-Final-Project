import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Function to validate and trim required form data
  const validateAndTrim = (formData) => {
    const { firstName, lastName, email, password } = formData;

    // Check for required fields and trim spaces
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !password.trim()
    ) {
      throw new Error("Missing required fields");
    }

    return {
      ...formData,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      password: password.trim(),
    };
  };

  // Registration logic
  const register = async (formData) => {
    try {
      const validatedData = validateAndTrim(formData);

      // Send a request to your backend server here with validatedData
      setUser(validatedData);
      console.log("Registration successful", validatedData);
    } catch (error) {
      console.error("Registration failed", error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, register }}>
      {children}
    </AuthContext.Provider>
  );
};
