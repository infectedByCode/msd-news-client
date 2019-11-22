import React from 'react'
import { Link } from '@reach/router'

const TopicCard = props => {
  const { topic } = props

  return (
    <Link to={`/topic/${topic.slug}`}>
      <li className='topic-card'>
        <h2>
          <span>newsBits/</span>
          {topic.slug}
        </h2>
      </li>
    </Link>
  )
}

export default TopicCard
