import React, { Component } from 'react'
import * as api from '../api'
import ArticleList from './ArticleList'

class SingleTopic extends Component {
  render () {
    const { topic } = this.props

    return (
      <main>
        <ArticleList topic={topic} />
      </main>
    )
  }
}

export default SingleTopic
