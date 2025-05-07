import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserData(decoded);
      } catch (err) {
        console.error("Token decoding failed", err);
        setUserData(null);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ userData }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
