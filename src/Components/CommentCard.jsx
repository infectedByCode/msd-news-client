import React from 'react'
import Timestamp from 'react-timestamp'
import { Link } from '@reach/router'
import * as api from '../api'
import Voter from './Voter'

const CommentCard = props => {
  const { author, created_at, votes, body, comment_id } = props.comment
  const { currentUser, loggedIn, filterComments, toggleCommentDeleted, toggleCommentError } = props

  const handleClick = () => {
    api
      .deleteCommentById(comment_id)
      .then(status => {
        if (status === 204) {
          filterComments(comment_id)
          toggleCommentDeleted()
          setTimeout(toggleCommentDeleted, 3000)
        }
      })
      .catch(error => {
        if (error) toggleCommentError()
        setTimeout(toggleCommentError, 3000)
      })
  }

  return (
    <li className='comment-card'>
      <Link to={`/users/${author}`}>
        <h5>
          {author}
        </h5>
      </Link>
      <p>
        {body}
      </p>
      <Timestamp relative date={created_at} />
      {currentUser === author &&
        <button className='btn-danger' onClick={handleClick}>
          Delete
        </button>}
      {currentUser !== author && <Voter comment_id={comment_id} votes={votes} loggedIn={loggedIn} />}
    </li>
  )
}

export default CommentCard
