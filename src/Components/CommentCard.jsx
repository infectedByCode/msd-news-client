import React from 'react'
import Timestamp from 'react-timestamp'

const CommentCard = props => {
  const { author, votes, created_at, body } = props.comment

  return (
    <li className='comment-card'>
      <h5>
        {author}
      </h5>
      <p>
        {body}
      </p>
      <span>
        votes: {votes}
      </span>
      <Timestamp relative date={created_at} />
    </li>
  )
}

export default CommentCard
