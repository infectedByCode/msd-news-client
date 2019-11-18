import React from 'react'
import { navigate } from '@reach/router'

const TopicCard = props => {
  const { topics } = props

  return topics.map(topic => {
    return (
      <li className='card' key={topic.slug}>
        <h2>
          newsbits/{topic.slug}
        </h2>
        <h3>
          {topic.description}
        </h3>
      </li>
    )
  })
}

export default TopicCard
