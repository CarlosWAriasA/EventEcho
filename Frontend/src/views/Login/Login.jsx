import { Mail, Lock } from "lucide-react";
import { useState } from "react";
import "../../App.css";
import { USER_TOKEN } from "../../utils/constans";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Login() {
  const { setUserToken } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex justify-center">
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
          Sing In
        </h1>
        <form
          onSubmit={() => {
            setUserToken("hola");
            localStorage.setItem(USER_TOKEN, "hola");
          }}
        >
          <div className="relative my-4">
            {email === "" && (
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <Mail size={24} color="black" />
              </span>
            )}
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              className="bg-white text-black p-2 rounded-md w-72"
              placeholder="       Email Address"
            />
          </div>
          <div className="relative mt-4">
            {password === "" && (
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <Lock size={24} color="black" />
              </span>
            )}
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              className="bg-white text-black p-2 rounded-md w-72"
              placeholder="       Password"
            />
          </div>
          <div className="mb-4 flex justify-end text-gray-400 hover:text-white hover:cursor-pointer">
            <span>Forgot Password?</span>
          </div>
          <button
            type="submit"
            className="text-black px-8 font-normal h-10 justify-center py-0 w-full"
            style={{ backgroundColor: "#dbe2e4" }}
          >
            Sign In
          </button>
          <div className="mt-2 mb-2 text-gray-400 hover:text-white hover:cursor-pointer">
            <span>Or</span>
          </div>
          <a href="/register">
            <button
              type="button"
              className="text-black px-8 font-normal h-10 justify-center py-0 hover:bg-yellow-400 bg-yellow-500 w-full"
            >
              Register
            </button>
          </a>
        </form>
      </div>
    </div>
  );
}

export default Login;
