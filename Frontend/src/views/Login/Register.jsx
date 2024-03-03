import { useState } from "react";
import ButtonForm from './components/ButtonForm'
import TextInput from './components/InputForm'
import Box from '@mui/material/Box'
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import MailRoundedIcon from '@mui/icons-material/MailRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';

function Register() {
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    userName: "",
  });

  return (
      <Box
        sx={{
          display: "grid",
          maxWidth: '100%',
          minWidth: '90%',
          gridTemplateRows: '1px',
          rowGap: '1rem'
        }}
      >
        <div
          style={{
            position: 'relative',
            width: "35px",
            height: "8px",
            backgroundColor: "#dbe2e4",
            bottomBottom: '1rem',
            borderRadius: "2px",
          }}
        ></div>
        <h1 className="text-4xl text-white font-bold mb-6 text-start">
          Register
        </h1>
        {/* <form> */}
            <TextInput
              id={'name'}
              type={'text'}
              label={'Name'}
              value={newUser?.userName}
              onChange={(e) => setNewUser((prev) => ({...prev, userName: e.target.value}))}
              icon={<BadgeRoundedIcon/>}

            />
            <TextInput
              id={'email'}
              type={'email'}
              label={'Email'}
              value={newUser?.email}
              onChange={(e) => setNewUser((prev) => ({ ...prev, email: e.target.value}))}
              icon={<MailRoundedIcon/>}
            />
            <TextInput
              id={'password'}
              type={'password'}
              label={'Password'}
              value={newUser?.password}
              onChange={(e) => setNewUser((prev) => ({ ...prev, password: e.target.value}))}
              icon={<LockRoundedIcon/>}
            />
          <TextInput
            id={'confirm-password'}
            type={'password'}
            value={newUser?.confirmPassword}
            onChange={(e) => setNewUser((prev) => ({...prev, confirmPassword: e.target.value}))}
            label={'Confirm Password'}
            icon={<KeyRoundedIcon/>}

          />
          <ButtonForm
          label={'Register'}
          />
        {/* </form> */}
      </Box>
  );
}

export default Register;
