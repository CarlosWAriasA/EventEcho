import { useState, useContext } from "react";
import ButtonForm from "../../components/Button/ButtonForm";
import TextInput from "../../components/Input/InputForm";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import MailRoundedIcon from "@mui/icons-material/MailRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
import { LoadingContext } from "../../context/LoadingContext";
import ToastHelper from "../../utils/toastHelper";
import RequestHelper from "../../utils/requestHelper";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import useKeypress from "react-use-keypress";
import { KEY_ENTER } from "../../utils/constants";

function Register() {
  const navigate = useNavigate();
  const { setIsLoading } = useContext(LoadingContext);
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    userName: "",
    lastName: "",
    name: "",
    role: "Usuario",
  });
  const roles = ["Usuario", "Organizador"];

  const sx = {
    background: "rgb(248, 250, 229, 0.8)",
    "& .MuiFilledInput-underline:after": {
      borderBottomColor: "#FAEF5D",
      height: "5rem",
      borderRadius: "0 0 10px 10px",
    },
  };

  const cleanUser = () => {
    setNewUser({
      email: "",
      password: "",
      confirmPassword: "",
      userName: "",
      lastName: "",
      name: "",
    });
  };

  const validateUser = () => {
    if (!newUser.userName) {
      ToastHelper.error("El Nombre es requerido.", "top-center");
      return false;
    }

    if (!newUser.email) {
      ToastHelper.error("El Correo Electronico es requerido.", "top-center");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newUser.email)) {
      ToastHelper.error("El Correo Electronico es invalido.", "top-center");
      return false;
    }

    if (!newUser.password) {
      ToastHelper.error("La Contraseña es requerida.", "top-center");
      return false;
    }

    if (newUser.password.length < 6) {
      ToastHelper.error(
        "La Contraseña tiene que tener minimo 6 caracteres",
        "top-center"
      );
      return false;
    }

    if (!newUser.confirmPassword) {
      ToastHelper.error("Confirmar Contraseña es requerido.", "top-center");
      return false;
    }

    if (!newUser.role) {
      ToastHelper.error("El Rol es requerido", "top-center");
      return false;
    }

    if (newUser.password !== newUser.confirmPassword) {
      ToastHelper.error("Las Contraseñas no son iguales.", "top-center");
      return false;
    }

    return true;
  };

  const registerUser = async () => {
    try {
      setIsLoading(true);
      if (validateUser()) {
        const result = await RequestHelper.post("register", {
          name: newUser.userName,
          email: newUser.email,
          password: newUser.password,
          tipo_usuario: newUser.role.toLowerCase(),
        });
        ToastHelper.success(result.msg);
        cleanUser();
        navigate("/");
      }
    } catch (error) {
      ToastHelper.warning(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useKeypress([KEY_ENTER], registerUser);
  return (
    <Box
      sx={{
        display: "grid",
        maxWidth: "100%",
        minWidth: "90%",
        gridTemplateRows: "1px",
        rowGap: "1rem",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "35px",
          height: "8px",
          backgroundColor: "#dbe2e4",
          bottomBottom: "1rem",
          borderRadius: "2px",
        }}
      ></div>
      <h1 className="text-4xl text-white font-bold mb-6 text-start">
        Registro
      </h1>
      <TextInput
        id={"name"}
        type={"text"}
        label={"Nombre"}
        className="rounded-lg w-72"
        value={newUser?.userName}
        onChange={(e) =>
          setNewUser((prev) => ({ ...prev, userName: e.target.value }))
        }
        icon={<BadgeRoundedIcon />}
        sx={sx}
      />
      <TextInput
        id={"email"}
        type={"email"}
        label={"Correo Electronico"}
        className="rounded-lg w-72"
        value={newUser?.email}
        onChange={(e) =>
          setNewUser((prev) => ({ ...prev, email: e.target.value }))
        }
        icon={<MailRoundedIcon />}
        sx={sx}
      />
      <TextInput
        id={"password"}
        type={"password"}
        label={"Contraseña"}
        value={newUser?.password}
        className="rounded-lg w-72"
        onChange={(e) =>
          setNewUser((prev) => ({ ...prev, password: e.target.value }))
        }
        icon={<LockRoundedIcon />}
        sx={sx}
      />
      <TextInput
        id={"confirm-password"}
        type={"password"}
        value={newUser?.confirmPassword}
        onChange={(e) =>
          setNewUser((prev) => ({ ...prev, confirmPassword: e.target.value }))
        }
        label={"Confirmar Contraseña"}
        className="rounded-lg w-72"
        icon={<KeyRoundedIcon />}
        sx={sx}
      />
      <Select
        value={newUser.role}
        onChange={(e) =>
          setNewUser((prev) => ({ ...prev, role: e.target.value }))
        }
        className="rounded-lg w-72"
        sx={sx}
      >
        {roles.map((role) => (
          <MenuItem key={role} value={role}>
            {role}
          </MenuItem>
        ))}
      </Select>
      <ButtonForm
        onClick={registerUser}
        label={"Registrarse"}
        style={{ backgroundColor: "#FAEF5D", color: "#212A3E" }}
      />
    </Box>
  );
}

export default Register;
