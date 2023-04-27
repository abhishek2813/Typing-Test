import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../fireBaseConfig';


function UserInfo({ totalTest }) {
    const [user] = useAuthState(auth)
    return (
        <div className='row'>

            <div className="userinfo">
                <div className="image">
                    <AccountCircleIcon style={{ display: 'block', transform: 'scale(6)', margin: 'auto', marginTop: '3.5rem' }} />
                </div>
                <div className="info">
                    <div className="email">
                        {user.email}
                    </div>
                    <div className="joinAt">
                        {user.metadata.creationTime}
                    </div>
                </div>
            </div>
            <div className="test">
                Total Test Taken  :- <span>{totalTest}</span>

            </div>
        </div>
    )
}

export default UserInfo