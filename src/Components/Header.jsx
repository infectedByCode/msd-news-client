import React from 'react'
import { Link } from '@reach/router'

const Header = props => {
  const { currentUser, loggedIn, handleSignIn } = props

  const handleClick = e => {
    handleSignIn('jessjelly')
  }

  return (
    <header>
      <nav>
        <Link id='logo' to='/'>
          newsBits
        </Link>
        <Link to='/'>Home</Link>

        <Link to='#'>
          {currentUser ? `Hello, ${currentUser}` : 'Sign Up'}
        </Link>
        <Link to='/' onClick={handleClick}>
          {loggedIn ? 'Log off' : 'Log in'}
        </Link>
      </nav>
      <h1>NewsBits</h1>
    </header>
  )
}

export default Header
