import React from 'react'
import AccountCircle from './AccountCircle'
import { useNavigate } from 'react-router-dom'
import KeyboardIcon from '@mui/icons-material/Keyboard';
import { Typography } from '@mui/material';

function Header() {
  const navigate = useNavigate();
  return (
    <div className='header'>
      <div className="logo" style={{cursor:'pointer'}} onClick={()=>{navigate('/')}}>
        <Typography variant='h3'>
        <KeyboardIcon sx={{ fontSize: 40}}/>Typing World
        </Typography>
      </div>
      <div className="user-icon" style={{cursor:'pointer'}}>
       <AccountCircle />
      </div>
    </div>
  )
}

export default Header