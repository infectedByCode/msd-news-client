import React from 'react'
import './App.css'
import { Router } from '@reach/router'
import Header from './Components/Header'
import Homepage from './Components/Homepage'
import SingleTopic from './Components/SingleTopic'

function App () {
  return (
    <div className='App'>
      <Header />
      <Router>
        <Homepage path='/' />
        <SingleTopic path='/topic/:topic' />
      </Router>
    </div>
  )
}

export default App
