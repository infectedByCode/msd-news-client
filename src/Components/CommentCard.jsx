import React from 'react'
import { Button } from 'react-bootstrap'
import Timestamp from 'react-timestamp'
import * as api from '../api'

const CommentCard = props => {
  const { author, votes, created_at, body, comment_id } = props.comment
  const { currentUser, fetchComments, toggleCommentDeleted } = props

  const handleClick = () => {
    api.deleteCommentByArticleId(comment_id).then(status => {
      if (status === 204) {
        fetchComments(props.article_id)
        toggleCommentDeleted()
      }
    })
    setTimeout(toggleCommentDeleted, 3000)
  }

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
      {currentUser === author
        ? <Button variant='danger' onClick={handleClick}>
            Delete
          </Button>
        : /* upvote render */ ''}
    </li>
  )
}

export default CommentCard
