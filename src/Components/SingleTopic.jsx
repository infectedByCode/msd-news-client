import React from 'react'
import ArticleList from './ArticleList'

const SingleTopic = props => {
  const { topic, currentUser, loggedIn } = props

  return (
    <main>
      <ArticleList topic={topic} currentUser={currentUser} loggedIn={loggedIn} />
    </main>
  )
}

export default SingleTopic
