import React from 'react'
import { Button } from 'react-bootstrap'
import Timestamp from 'react-timestamp'
import * as api from '../api'

const CommentCard = props => {
  const { author, created_at, votes, body, comment_id } = props.comment
  const { currentUser, fetchComments, toggleCommentDeleted } = props

  const handleClick = () => {
    api.deleteCommentById(comment_id).then(status => {
      if (status === 204) {
        fetchComments(props.article_id)
        toggleCommentDeleted()
      }
    })
    setTimeout(toggleCommentDeleted, 3000)
  }
  // Remake as component for voting
  const handleVote = e => {
    const vote = e.target.id === 'upvote' ? 1 : -1
    // vote > 0 ? votes++ : votes--
    // Update DB
    api.patchCommentById(comment_id, vote).then(console.log)
  }

  return (
    <li className='comment-card'>
      <h5>
        {author}
      </h5>
      <p>
        {body}
      </p>
      <p>
        <span>
          votes: {votes}
        </span>
      </p>
      <div>
        <button id='upvote' className='vote-btn' onClick={handleVote}>
          +
        </button>
        <button id='downvote' className='vote-btn' onClick={handleVote}>
          -
        </button>
      </div>
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
