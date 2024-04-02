import { useState, useContext } from "react";
import { USER_TOKEN } from "../../utils/constants";
import { AuthContext } from "../../context/AuthContext";
import ButtonForm from "../../components/Button/ButtonForm";
import TextInput from "../../components/Input/InputForm";
import HttpsRoundedIcon from "@mui/icons-material/HttpsRounded";
import MailRoundedIcon from "@mui/icons-material/MailRounded";
import Box from "@mui/material/Box";
import RequestHelper from "../../utils/requestHelper";
import ToastHelper from "../../utils/toastHelper";
import { LoadingContext } from "../../context/LoadingContext";
import useKeypress from "react-use-keypress";
import { KEY_ENTER } from "../../utils/constants";

function Login() {
  const { setUserToken, setUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLoading } = useContext(LoadingContext);

  const cleanUser = () => {
    setEmail("");
    setPassword("");
  };

  const validateUser = () => {
    if (!email) {
      ToastHelper.error("El Correo Electronico es requerido.", "top-center");
      return false;
    }

    if (!password) {
      ToastHelper.error("La Contraseña es requerida.", "top-center");
      return false;
    }

    return true;
  };

  const login = async () => {
    try {
      setIsLoading(true);
      if (validateUser()) {
        const result = await RequestHelper.post("login", {
          email: email,
          password: password,
        });
        localStorage.setItem(USER_TOKEN, result.token);
        const user = await RequestHelper.get("profile");
        if (user.profileImage) {
          try {
            const blob = await RequestHelper.get(user.profileImage, "image");
            user.image = new File([blob], `image_user.jpg`, {
              type: "image/jpeg",
            });
          } catch (error) {
            //
          }
        }
        setUser(user);
        setUserToken(result.token);
        ToastHelper.success("Usuario logueado exitosamente");
        cleanUser();
      }
    } catch (error) {
      ToastHelper.error("Ha ocurrido un error");
    } finally {
      setIsLoading(false);
    }
  };

  useKeypress([KEY_ENTER], login);
  return (
    <div>
      <div>
        <div
          style={{
            width: "35px",
            height: "8px",
            backgroundColor: "#dbe2e4",
            marginBottom: "8px",
            borderRadius: "2px",
          }}
        ></div>
        <h1 className="text-4xl text-white font-bold mb-6 text-start">Login</h1>
        <div className="relative my-4">
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <TextInput
              id={"email"}
              type={"email"}
              className="rounded-lg w-72"
              label={"Correo Electronico"}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              icon={<MailRoundedIcon fontSize="medium" />}
              sx={{
                background: "rgb(248, 250, 229, 0.8)",
                "& .MuiFilledInput-underline:after": {
                  borderBottomColor: "#FAEF5D",
                  height: "5rem",
                  borderRadius: "0 0 10px 10px",
                },
              }}
            />
          </Box>
        </div>
        <div className="relative mt-4">
          <TextInput
            type={"password"}
            label={"Contraseña"}
            className="rounded-lg w-72"
            id={"password"}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            sx={{
              background: "rgb(248, 250, 229, 0.8)",
              "& .MuiFilledInput-underline:after": {
                borderBottomColor: "#FAEF5D",
                height: "5rem",
                borderRadius: "0 0 10px 10px",
              },
            }}
            icon={<HttpsRoundedIcon />}
          />
        </div>
        <div className="mb-4 flex justify-end text-gray-400 hover:text-white hover:cursor-pointer">
          <span style={{ marginTop: "1rem" }}>Olvidaste la Contraseña?</span>
        </div>
        <ButtonForm
          onClick={login}
          label="Iniciar Sesion"
          className={
            "text-black px-8 font-normal h-10 justify-center py-0 w-full rounded-lg"
          }
          style={{ backgroundColor: "#FAEF5D", color: "#212A3E" }}
        />
      </div>
    </div>
  );
}

export default Login;
