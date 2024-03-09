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
  });

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
      ToastHelper.error("The Name is required.");
      return false;
    }

    if (!newUser.email) {
      ToastHelper.error("The Email is required.");
      return false;
    }

    if (!newUser.password) {
      ToastHelper.error("The Password is required.");
      return false;
    }

    if (!newUser.confirmPassword) {
      ToastHelper.error("The Confirm Password is required.");
      return false;
    }

    if (newUser.password !== newUser.confirmPassword) {
      ToastHelper.error("The passwords do not match.");
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
          lastName: newUser.userName,
          username: newUser.userName,
          email: newUser.email,
          password: newUser.password,
        });
        ToastHelper.success(result.msg);
        cleanUser();
        navigate("/");
      }
    } catch (error) {
      ToastHelper.error("Ha ocurrido un error");
    } finally {
      setIsLoading(false);
    }
  };

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
        Register
      </h1>
      <TextInput
        id={"name"}
        type={"text"}
        label={"Name"}
        value={newUser?.userName}
        onChange={(e) =>
          setNewUser((prev) => ({ ...prev, userName: e.target.value }))
        }
        icon={<BadgeRoundedIcon />}
      />
      <TextInput
        id={"email"}
        type={"email"}
        label={"Email"}
        value={newUser?.email}
        onChange={(e) =>
          setNewUser((prev) => ({ ...prev, email: e.target.value }))
        }
        icon={<MailRoundedIcon />}
      />
      <TextInput
        id={"password"}
        type={"password"}
        label={"Password"}
        value={newUser?.password}
        onChange={(e) =>
          setNewUser((prev) => ({ ...prev, password: e.target.value }))
        }
        icon={<LockRoundedIcon />}
      />
      <TextInput
        id={"confirm-password"}
        type={"password"}
        value={newUser?.confirmPassword}
        onChange={(e) =>
          setNewUser((prev) => ({ ...prev, confirmPassword: e.target.value }))
        }
        label={"Confirm Password"}
        icon={<KeyRoundedIcon />}
      />
      <ButtonForm onClick={registerUser} label={"Register"} />
    </Box>
  );
}

export default Register;
