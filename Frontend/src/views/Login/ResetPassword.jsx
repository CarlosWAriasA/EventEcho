import ButtonForm from "../../components/Button/ButtonForm";
import TextInput from "../../components/Input/InputForm";
import HttpsRoundedIcon from "@mui/icons-material/HttpsRounded";
import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RequestHelper from "../../utils/requestHelper";
import ToastHelper from "../../utils/toastHelper";
import { LoadingContext } from "../../context/LoadingContext";
import { KEY_ENTER } from "../../utils/constants";
import useKeypress from "react-use-keypress";

function ResetPassword() {
  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });
  const { Token } = useParams();
  const navigate = useNavigate();
  const [isFetching, setIsFetching] = useState(false);
  const { setIsLoading } = useContext(LoadingContext);

  const changePassword = async () => {
    setIsFetching(true);
    setIsLoading(true);
    try {
      if (!passwords.password) {
        ToastHelper.warning("La Contraseña es requerida.", "top-center");
        return false;
      }

      if (passwords.password.length < 6) {
        ToastHelper.warning(
          "La Contraseña tiene que tener minimo 6 caracteres",
          "top-center"
        );
        return false;
      }

      if (!passwords.confirmPassword) {
        ToastHelper.warning("Confirmar Contraseña es requerido.", "top-center");
        return false;
      }

      if (passwords.password !== passwords.confirmPassword) {
        ToastHelper.warning("Las Contraseñas no son iguales.", "top-center");
        return false;
      }

      const result = await RequestHelper.post(`reset-password/${Token}`, {
        newPassword: passwords.password,
      });

      ToastHelper.success(result.message);
      navigate("/login");
    } catch (error) {
      ToastHelper.warning(error.message);
    } finally {
      setIsLoading(false);
      setIsFetching(false);
    }
  };

  useKeypress([KEY_ENTER], changePassword);
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
        <h1 className="font-quicksand font-bold text-3xl text-white mb-6 text-start">
          Cambiar Contreseña
        </h1>
        <div className="relative mt-4">
          <TextInput
            type={"password"}
            label={"Nueva Contraseña"}
            className="rounded-lg w-full"
            value={passwords.password}
            onChange={(e) =>
              setPasswords((prev) => ({ ...prev, password: e.target.value }))
            }
            id={"password"}
            sx={{
              background: "rgb(248, 250, 229, 0.9)",
              "& .MuiFilledInput-underline:after": {
                borderBottomColor: "#FEDB39",
                height: "5rem",
                borderRadius: "0 0 10px 10px",
              },
            }}
            icon={<HttpsRoundedIcon />}
          />
        </div>
        <div className="relative mt-4">
          <TextInput
            type={"password"}
            label={"Confirmar Contraseña"}
            className="rounded-lg w-full"
            value={passwords.confirmPassword}
            onChange={(e) =>
              setPasswords((prev) => ({
                ...prev,
                confirmPassword: e.target.value,
              }))
            }
            id={"confirm'password"}
            sx={{
              background: "rgb(248, 250, 229, 0.9)",
              "& .MuiFilledInput-underline:after": {
                borderBottomColor: "#FEDB39",
                height: "5rem",
                borderRadius: "0 0 10px 10px",
              },
            }}
            icon={<HttpsRoundedIcon />}
          />
        </div>
        <div className="relative mt-4">
          <ButtonForm
            label={
              <p className="font-quicksand font-semibold tracking-normal">
                Cambiar Contraseña
              </p>
            }
            onClick={isFetching ? () => {} : changePassword}
            className={"px-8 h-10 justify-center w-full rounded-lg"}
            style={{ backgroundColor: "#FEDB39", color: "#212A3E" }}
          />
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
