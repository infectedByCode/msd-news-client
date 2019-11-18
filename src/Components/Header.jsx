import React from 'react'
import { Link } from '@reach/router'

const Header = () => {
  return (
    <header>
      <nav>
        <Link to='/'>Home</Link>
      </nav>
      <h1>Welcome to NewsBits</h1>
    </header>
  )
}

export default Header
