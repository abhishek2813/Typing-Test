import { Box, Button, TextField } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useTheme } from '../Context/ThemeContest';
import { auth } from '../fireBaseConfig'
import { toast } from 'react-toastify'
import errorMapping from '../Utils/errorMapping';

function SignUp({ handleClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const { theme } = useTheme();

  const handleSubmit = () => {
    if (!email || !password || !cpassword) {
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
    if (password !== cpassword) {
      toast.warning('Password Not Matched', {
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
    auth.createUserWithEmailAndPassword(email, password).then((res) => {
      toast.success('User Created', {
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
        <TextField variant='outlined' type='password' label='Enter Confirm password'
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
          onChange={(e) => setCPassword(e.target.value)} />

        <Button variant='contained' size='large' style={{
          color: theme.background,
          background: theme.textColor
        }}
          onClick={handleSubmit}
        >SignUp</Button>
      </Box>
    </div>
  )
}

export default SignUp