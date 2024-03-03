import { useState, createContext, useEffect } from "react";
import { USER_TOKEN } from "../utils/constans";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const logout = () => {
    setIsLoading(true);
    setUserToken(null);
    localStorage.setItem(USER_TOKEN, null);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      const userToken = localStorage.getItem(USER_TOKEN);
      if (userToken !== null) {
        setUserToken(userToken);
      }
    } catch (error) {
      console.error(`Function is Logged In error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  useEffect(() => {
    localStorage.setItem(USER_TOKEN, userToken);
  }, [userToken]);

  return (
    <AuthContext.Provider
      value={{
        logout,
        isLoading,
        userToken,
        setUserToken,
        setIsLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
