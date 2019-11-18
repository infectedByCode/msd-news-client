import React from 'react'
import { Link } from '@reach/router'

const Header = () => {
  return (
    <header>
      <nav>
        <Link id='logo' to='/'>
          newsBits
        </Link>
        <Link to='/'>Home</Link>
        <Link to='/'>#User</Link>
        <Link to='/'>#login</Link>
      </nav>
      <h1>Welcome to NewsBits</h1>
    </header>
  )
}

export default Header
