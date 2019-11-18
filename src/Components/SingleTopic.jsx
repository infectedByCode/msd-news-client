import React, { Component } from 'react'
import ArticleList from './ArticleList'

const SingleTopic = props => {
  const { topic } = props

  return (
    <main>
      <ArticleList topic={topic} />
    </main>
  )
}

export default SingleTopic
