import { useState, createContext, useEffect, useContext } from "react";
import { USER_TOKEN } from "../utils/constans";
import { LoadingContext } from "./LoadingContext";
import RequestHelper from "../utils/requestHelper";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
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
    const userToken = localStorage.getItem(USER_TOKEN);
    try {
      if (userToken && userToken !== "null") {
        setIsLoading(true);
        const result = await RequestHelper.get("profile");
        if (result) {
          setUser(result);
          setUserToken(userToken);
        } else {
          setUserToken(null);
          localStorage.setItem(USER_TOKEN, null);
        }
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

  return (
    <AuthContext.Provider
      value={{
        logout,
        userToken,
        setUserToken,
        isLoading,
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
