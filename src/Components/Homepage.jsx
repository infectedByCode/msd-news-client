import React from 'react'
import ArticleList from './ArticleList'
import TopicList from './TopicList'

function Homepage () {
  return (
    <main id='homepage-layout'>
      <ArticleList />
      <TopicList />
    </main>
  )
}

export default Homepage
