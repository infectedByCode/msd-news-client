import React from 'react'

const ErrorPage = props => {
  const { error: { status, msg } } = props

  return (
    <main class='error-page'>
      {status === 404 ? <><h2>404</h2><br/><h3>Oh Great! {msg}</h3><br/><p>You may have broken the internet. That means you should get back to working on that project.</p><br/><a href="/">Oh wait! Reset here.</a></>:<>
      <h2>
        Error: {status}
      </h2>
      <h3>
        {msg} - Something went wrong :-(  
      </h3><br /><a href="/">Reset here to try again.</a></>
      }
    </main>
  )
}

export default ErrorPage
