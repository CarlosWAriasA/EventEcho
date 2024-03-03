import { Mail, Lock, User } from "lucide-react";
import { useContext, useState } from "react";
import ToastHelper from "../../utils/toastHelper";
import RequestHelper from "../../utils/requestHelper";
import { useNavigate } from "react-router-dom";
import { LoadingContext } from "../../context/LoadingContext";

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
    if (!newUser.name) {
      ToastHelper.error("The Name is required.");
      return false;
    }

    if (!newUser.lastName) {
      ToastHelper.error("The Last Name is required.");
      return false;
    }

    if (!newUser.userName) {
      ToastHelper.error("The User Name is required.");
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

  const registerUser = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      if (validateUser()) {
        const result = await RequestHelper.post("register", {
          name: newUser.name,
          lastName: newUser.lastName,
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
    <div>
      <div>
        <div
          style={{
            width: "35px",
            height: "10px",
            backgroundColor: "#dbe2e4",
            marginBottom: "4px",
            borderRadius: "2px",
          }}
        ></div>
        <h1 className="text-4xl text-white font-bold mb-6 text-start">
          Register
        </h1>
        <form onSubmit={registerUser}>
          <div className="w-72 my-4">
            <div className="flex gap-1">
              <div className="relative">
                {newUser?.name === "" && (
                  <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <User size={24} color="black" />
                  </span>
                )}
                <input
                  value={newUser?.name}
                  onChange={(e) =>
                    setNewUser((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  type="text"
                  id="name"
                  className="bg-white text-black p-2 rounded-md"
                  placeholder="       Name"
                  style={{ width: "142px" }}
                />
              </div>
              <div className="relative">
                {newUser?.lastName === "" && (
                  <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <User size={24} color="black" />
                  </span>
                )}
                <input
                  value={newUser?.lastName}
                  onChange={(e) =>
                    setNewUser((prev) => ({
                      ...prev,
                      lastName: e.target.value,
                    }))
                  }
                  type="text"
                  id="lastName"
                  className="bg-white text-black p-2 rounded-md"
                  placeholder="       LastName"
                  style={{ width: "142px" }}
                />
              </div>
            </div>
          </div>
          <div className="relative my-4">
            {newUser?.userName === "" && (
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <User size={24} color="black" />
              </span>
            )}
            <input
              value={newUser?.userName}
              onChange={(e) =>
                setNewUser((prev) => ({ ...prev, userName: e.target.value }))
              }
              type="text"
              id="username"
              className="bg-white text-black p-2 rounded-md w-72"
              placeholder="       Username"
            />
          </div>
          <div className="relative my-4">
            {newUser?.email === "" && (
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <Mail size={24} color="black" />
              </span>
            )}
            <input
              value={newUser?.email}
              onChange={(e) =>
                setNewUser((prev) => ({ ...prev, email: e.target.value }))
              }
              type="email"
              id="email"
              className="bg-white text-black p-2 rounded-md w-72"
              placeholder="       Email Address"
            />
          </div>
          <div className="relative mt-4">
            {newUser?.password === "" && (
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <Lock size={24} color="black" />
              </span>
            )}
            <input
              value={newUser?.password}
              onChange={(e) =>
                setNewUser((prev) => ({ ...prev, password: e.target.value }))
              }
              type="password"
              id="password"
              className="bg-white text-black p-2 rounded-md w-72"
              placeholder="       Password"
            />
          </div>
          <div className="relative mt-4">
            {newUser?.confirmPassword === "" && (
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <Lock size={24} color="black" />
              </span>
            )}
            <input
              value={newUser?.confirmPassword}
              onChange={(e) =>
                setNewUser((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }))
              }
              type="password"
              id="confirm-password"
              className="bg-white text-black p-2 rounded-md w-72"
              placeholder="       Confirm Password"
            />
          </div>
          <button
            type="submit"
            className="text-black px-8 font-normal h-10 justify-center py-0 mt-4 w-full bg-yellow-400 rounded-lg"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
