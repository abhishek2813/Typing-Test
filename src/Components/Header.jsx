import React from 'react'
import AccountCircle from './AccountCircle'

function Header() {
  return (
    <div className='header'>
      <div className="log">
        Logo
      </div>
      <div className="user-icon">
       <AccountCircle />
      </div>
    </div>
  )
}

export default Header