import { useState, createContext, useEffect, useContext } from "react";
import { USER_TOKEN } from "../utils/constans";
import { LoadingContext } from "./LoadingContext";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setIsLoading: loading } = useContext(LoadingContext);

  const logout = () => {
    loading(true);
    localStorage.setItem(USER_TOKEN, null);
    setTimeout(() => {
      setUserToken(null);
      loading(false);
    }, 1000);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      const userToken = localStorage.getItem(USER_TOKEN);
      if (userToken) {
        setUserToken(userToken);
      }
    } catch (error) {
      console.error(`Function is Logged In error: ${error}`);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        logout,
        userToken,
        setUserToken,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
