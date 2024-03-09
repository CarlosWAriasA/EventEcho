import { useState, useContext } from "react";
import { USER_TOKEN } from "../../utils/constans";
import { AuthContext } from "../../context/AuthContext";
import ButtonForm from "../../components/Button/ButtonForm";
import TextInput from "../../components/Input/InputForm";
import HttpsRoundedIcon from "@mui/icons-material/HttpsRounded";
import MailRoundedIcon from "@mui/icons-material/MailRounded";
import Box from "@mui/material/Box";
import RequestHelper from "../../utils/requestHelper";
import ToastHelper from "../../utils/toastHelper";
import { LoadingContext } from "../../context/LoadingContext";

function Login() {
  const { setUserToken } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLoading } = useContext(LoadingContext);

  const cleanUser = () => {
    setEmail("");
    setPassword("");
  };

  const validateUser = () => {
    if (!email) {
      ToastHelper.error("El Correo Electronico es requerido.");
      return false;
    }

    if (!password) {
      ToastHelper.error("La Contraseña es requerida.");
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
              label={"Correo Electronico"}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              icon={<MailRoundedIcon fontSize="medium" />}
            />
          </Box>
        </div>
        <div className="relative mt-4">
          <TextInput
            type={"password"}
            label={"Contraseña"}
            id={"password"}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            icon={<HttpsRoundedIcon />}
          />
        </div>
        <div className="mb-4 flex justify-end text-gray-400 hover:text-white hover:cursor-pointer">
          <span style={{ marginTop: "1rem" }}>Olvidaste la Contraseña?</span>
        </div>
        <ButtonForm onClick={login} label="Iniciar Sesion" />
      </div>
    </div>
  );
}

export default Login;
