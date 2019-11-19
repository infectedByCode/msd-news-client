import React from 'react'
import ArticleList from './ArticleList'
import TopicList from './TopicList'

function Homepage (props) {
  return (
    <main id='homepage-layout'>
      <ArticleList currentUser={props.currentUser} loggedIn={props.loggedIn} />
      <TopicList />
    </main>
  )
}

export default Homepage
