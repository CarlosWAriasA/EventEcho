import { useState, createContext, useEffect, useContext } from "react";
import { USER_TOKEN } from "../utils/constants";
import { LoadingContext } from "./LoadingContext";
import RequestHelper from "../utils/requestHelper";
import ToastHelper from "../utils/toastHelper";

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

  const loadUser = async () => {
    try {
      const result = await RequestHelper.get("profile");
      if (result) {
        if (result.profileImage) {
          try {
            const blob = await RequestHelper.get(result.profileImage, "image");
            result.image = new File([blob], `image_user.jpg`, {
              type: "image/jpeg",
            });
          } catch (error) {
            //
          }
        }
      }
      setUser(result);
    } catch (error) {
      ToastHelper.error("Ha ocurrido un error");
    }
  };

  const isLoggedIn = async () => {
    const userToken = localStorage.getItem(USER_TOKEN);
    try {
      if (userToken && userToken !== "null") {
        setIsLoading(true);
        const result = await RequestHelper.get("profile");
        if (result) {
          if (result.profileImage) {
            try {
              const blob = await RequestHelper.get(
                result.profileImage,
                "image"
              );
              result.image = new File([blob], `image_user.jpg`, {
                type: "image/jpeg",
              });
            } catch (error) {
              //
            }
          }
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
        loadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
