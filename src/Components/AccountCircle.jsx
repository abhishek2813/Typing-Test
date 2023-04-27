import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AppBar, Modal, Tab, Tabs, Box } from '@mui/material';
import React, { useState } from 'react'
import LoginFrom from './LoginFrom';
import SignUpForm from './SignUpForm';
import { useTheme } from '../Context/ThemeContest';
import GoogleButton from 'react-google-button'
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth'
import { auth } from '../fireBaseConfig';
import { toast } from 'react-toastify'
import errorMapping from '../Utils/errorMapping';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

function AccountCircle() {
    const [open, setopen] = useState(false)
    const [value, setvalue] = useState(0)
    const { theme } = useTheme();
    const navigate = useNavigate();
    const handleClose = () => {
        setopen(false)
    }
    const handleOpen = () => {
        if (user) {
            navigate('/user')
        } else {
            setopen(true)
        }
    }
    const handleChange = (e, v) => {
        setvalue(v)
    }
    const handleGoogleSignUp = () => {
        const googleProvider = new GoogleAuthProvider()
        signInWithPopup(auth, googleProvider).then((res) => {
            toast.success('Logged In with Google', {
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
    const [user] = useAuthState(auth);

    const logout = () => {
        signOut(auth);
        toast.success('Logged out', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigate('/')
    }
    return (
        <div>
            <AccountCircleIcon onClick={handleOpen} />
            {user && <LogoutOutlinedIcon onClick={logout} />}
            <Modal open={open}
                onClose={handleClose}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <div style={{ width: '400px', textAlign: 'center' }}>
                    <AppBar position='static' style={{ background: 'transparent' }}>
                        <Tabs variant='fullWidth'
                            value={value}
                            onChange={handleChange}
                        >
                            <Tab label='Login' style={{ color: theme.textColor }}></Tab>
                            <Tab label='Signup' style={{ color: theme.textColor }}></Tab>

                        </Tabs>
                    </AppBar>
                    {value === 0 && <LoginFrom handleClose={handleClose} />}
                    {value === 1 && <SignUpForm handleClose={handleClose} />}
                    <Box>
                        <span>OR</span>
                        <GoogleButton style={{ width: '100%', marginTop: '12px' }} onClick={handleGoogleSignUp} />
                    </Box>

                </div>
            </Modal>
        </div>
    )
}

export default AccountCircle