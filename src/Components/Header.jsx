import React from 'react'
import { Link } from '@reach/router'

const Header = props => {
  const { currentUser, loggedIn } = props

  return (
    <header>
      <nav>
        <Link id='logo' to='/'>
          newsBits
        </Link>
        <Link to='/'>Home</Link>
        <Link to='/'>
          {currentUser ? `Logged in as ${currentUser}` : 'Sign Up'}
        </Link>
        <Link to='/'>
          {loggedIn ? 'Log off' : 'Log in'}
        </Link>
      </nav>
      <h1>Welcome to NewsBits</h1>
    </header>
  )
}

export default Header
