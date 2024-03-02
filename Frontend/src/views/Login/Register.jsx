import { Mail, Lock, User } from "lucide-react";
import { useState } from "react";

function Register() {
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    userName: "",
  });

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
        <form>
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
              id="name"
              className="bg-white text-black p-2 rounded-md w-72"
              placeholder="       User name"
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
