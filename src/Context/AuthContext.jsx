import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useRefreshToken, useRevokeToken } from "../pages/Login/UseLoginData";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(Cookies.get("token"));
  const refresh = useRefreshToken();
  const revoke = useRevokeToken();

  const refreshTokens = async () => {
    try {
      const res = await refresh.mutateAsync();
      const decoded = jwtDecode(res.data["token"]);

      setToken(res.data["token"]);
      setUserData(decoded);
    } catch (e) {
      console.log("error in refreshing");
    }
  };

  const revokeTokens = async () => {
    try {
      await revoke.mutateAsync();
    } catch (e) {
      console.log("error in revokee", e);
    } finally {
      // Force logout locally regardless of server success/failure
      Cookies.remove("token");
      Cookies.remove("refreshToken");
      setToken(null);
      setUserData(null);
    }
  };

  const setDecodedUser = (token) => {
    if (!token) {
      setUserData(null);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setUserData(decoded);
      console.log(decoded);
      console.log(userData);
    } catch (err) {
      console.error("Token decoding failed", err);
      setUserData(null);
    }
  };

  useEffect(() => {
    if (token) {
      setDecodedUser(token);
    } else {
      refreshTokens();
    }
  }, [token]);
  return (
    <AuthContext.Provider value={{ userData, revokeTokens, setDecodedUser }}>
      {children}
    </AuthContext.Provider>
  );
};
