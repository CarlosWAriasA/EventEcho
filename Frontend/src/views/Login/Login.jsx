import { useState, useContext } from "react";
import { USER_TOKEN } from "../../utils/constans";
import { AuthContext } from "../../context/AuthContext";
import ButtonForm from "./components/ButtonForm";
import TextInput from "./components/InputForm";
import HttpsRoundedIcon from '@mui/icons-material/HttpsRounded';
import MailRoundedIcon from '@mui/icons-material/MailRounded';
import Box from '@mui/material/Box'

function Login() {
  const { setUserToken } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        <h1 className="text-4xl text-white font-bold mb-6 text-start">
          Login 
        </h1>
        <form
          onSubmit={() => {
            setUserToken("hola");
            localStorage.setItem(USER_TOKEN, "hola");
          }}
        >
          <div className="relative my-4">
            {email === "" && (
              // <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <span>
                {/* <Mail size={24} color="black" /> */}
              </span>
            )}
          <Box sx={{ display: 'flex', alignItems:'flex-end'}}>
            <TextInput
              id={'email'}
              type={'email'}
              label={'Email'}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              icon={<MailRoundedIcon fontSize="medium"/>}
            />
          </Box> 
          </div>
          <div className="relative mt-4">
            {password === "" && (
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                {/* <Lock size={24} color="black" /> */}
              </span>
            )}
            <TextInput
              type={'password'} 
              label={'Password'}
              id={'password'}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              icon={<HttpsRoundedIcon/>}
            
            />
          </div>
          <div className="mb-4 flex justify-end text-gray-400 hover:text-white hover:cursor-pointer">
            <span style={{marginTop: "1rem"}}>Forgot Password?</span>
          </div>
        </form>
        <ButtonForm label='Sign in' />
      </div>
    </div>
  );
}

export default Login;
