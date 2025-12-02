// import { createContext, useContext, useEffect, useState } from "react";
// import { jwtDecode } from "jwt-decode";
// import Cookies from "js-cookie";
// import { useRefreshToken, useRevokeToken } from "../pages/Login/UseLoginData";

// const AuthContext = createContext();
// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [userData, setUserData] = useState(null);
//   const [token, setToken] = useState(Cookies.get("token"));
  
//   const refresh = useRefreshToken();
//   const revoke = useRevokeToken();

//   const refreshTokens = async () => {
//     try {
//       const res = await refresh.mutateAsync();
//       const decoded = jwtDecode(res.data["token"]);

//       setToken(res.data["token"]);
//       setUserData(decoded);
//     } catch (e) {
//       console.log("error in refreshing");
//     }
//   };

//   const revokeTokens = async () => {
//     try {
//       await revoke.mutateAsync();
//     } catch (e) {
//       console.log("error in revokee", e);
//     } finally {
//       // Force logout locally regardless of server success/failure
//       Cookies.remove("token");
//       Cookies.remove("refreshToken");
//       setToken(null);
//       setUserData(null);
//     }
//   };

//   const setDecodedUser = (token) => {
//     if (!token) {
//       setUserData(null);
//       return;
//     }

//     try {
//       const decoded = jwtDecode(token);
//       setUserData(decoded);
//       console.log(decoded);
//       console.log(userData);
//     } catch (err) {
//       console.error("Token decoding failed", err);
//       setUserData(null);
//     }
//   };

//   useEffect(() => {
//     if (token) {
//       setDecodedUser(token);
//     } else {
//       refreshTokens();
//     }
//   }, [token]);
//   return (
//     <AuthContext.Provider value={{ userData, revokeTokens, setDecodedUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };










import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useRefreshToken, useRevokeToken } from "../pages/Login/UseLoginData";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(Cookies.get("token"));
  // 💡 التعديل 1: تعريف حالة التحميل وبدؤها بـ True
  const [isAuthLoading, setIsAuthLoading] = useState(true); 

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
    } finally {
      // 💡 التعديل 2: إنهاء التحميل بعد محاولة التحديث (سواء نجحت أو فشلت)
      setIsAuthLoading(false); 
    }
  };

  const revokeTokens = async () => {
    try {
      await revoke.mutateAsync();
    } catch (e) {
      console.log("error in revokee", e);
    } finally {
      Cookies.remove("token");
      Cookies.remove("refreshToken");
      setToken(null);
      setUserData(null);
      setIsAuthLoading(false); // إنهاء التحميل بعد عملية الإلغاء
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
    } catch (err) {
      console.error("Token decoding failed", err);
      setUserData(null);
    }
  };

  useEffect(() => {
    if (token) {
      setDecodedUser(token);
      // 💡 التعديل 3: إنهاء التحميل فوراً إذا وجد التوكن الأولي
      setIsAuthLoading(false); 
    } else {
      // إذا لم يوجد توكن، سنحاول تحديثه (refreshTokens تحتوي على setIsAuthLoading(false) في النهاية)
      refreshTokens(); 
    }
  }, [token]);

  // نستخدم useMemo لتحسين الأداء
  const contextValue = useMemo(() => ({
    userData,
    revokeTokens,
    setDecodedUser,
    isAuthLoading, // 💡 التعديل 4: تمرير حالة التحميل
  }), [userData, isAuthLoading]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}
