import React from 'react'
import './App.css'
import { Router } from '@reach/router'
import Header from './Components/Header'
import Homepage from './Components/Homepage'
import SingleTopic from './Components/SingleTopic'
import SingleArticle from './Components/SingleArticle'

function App () {
  return (
    <div className='App'>
      <Header />
      <Router>
        <Homepage path='/' />
        <SingleTopic path='/topic/:topic' />
        <SingleArticle path='/articles/:id' />
      </Router>
    </div>
  )
}

export default App
