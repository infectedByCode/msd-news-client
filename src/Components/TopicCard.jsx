import React from 'react'
import { Link } from '@reach/router'

const TopicCard = props => {
  const { topics } = props

  return topics.map(topic => {
    return (
      <Link key={topic.slug} to={`/topic/${topic.slug}`}>
        <li className='card'>
          <h2>
            newsbits/{topic.slug}
          </h2>
          <h3>
            {topic.description}
          </h3>
        </li>
      </Link>
    )
  })
}

export default TopicCard
