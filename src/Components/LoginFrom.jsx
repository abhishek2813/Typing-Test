import { Box, Button, TextField } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useTheme } from '../Context/ThemeContest';
import { auth } from '../fireBaseConfig'
import { toast } from 'react-toastify'
import errorMapping from '../Utils/errorMapping';

function LoginFrom({ handleClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { theme } = useTheme();

  const handleLogin = () => {
    if (!email || !password) {

      toast.warning('Fill All Details', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    auth.signInWithEmailAndPassword(email, password).then((res) => {

      toast.success('Logged In', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      handleClose()
    }).catch((err) => {

      toast.error(errorMapping[err.code] || 'Something Went Wrong', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    })
  }
  return (
    <div>
      <Box
        p={3}
        sx={
          {
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }
        }
      >
        <TextField variant='outlined' type='email' label='Enter Email'
          InputLabelProps={{
            style: {

              color: theme.textColor

            }
          }}
          inputProps={{
            style: {
              color: theme.textColor
            }
          }}
          onChange={(e) => setEmail(e.target.value)} />
        <TextField variant='outlined' type='password' label='Enter password'
          InputLabelProps={{
            style: {

              color: theme.textColor

            }
          }}
          inputProps={{
            style: {
              color: theme.textColor
            }
          }}
          onChange={(e) => setPassword(e.target.value)} />

        <Button variant='contained' size='large' style={{
          color: theme.background,
          background: theme.textColor
        }}
          onClick={handleLogin}
        >Login</Button>
      </Box>
    </div>
  )
}
export default LoginFrom