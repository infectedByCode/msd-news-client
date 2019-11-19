import React from 'react'

const ErrorPage = props => {
  const { error: { status, msg } } = props
  console.log(msg)
  return (
    <main>
      <h2>
        {status}
      </h2>
      <h3>
        {msg}
      </h3>
    </main>
  )
}

export default ErrorPage
