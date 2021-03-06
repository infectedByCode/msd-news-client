import React from 'react'
import CommentCard from './CommentCard'

const CommentsList = props => {
  const { comments, currentUser, filterComments, toggleCommentDeleted, toggleCommentError, loggedIn } = props

  return (
    <ul>
      {comments.map(comment => {
        return (
          <CommentCard
            comment={comment}
            currentUser={currentUser}
            loggedIn={loggedIn}
            filterComments={filterComments}
            toggleCommentDeleted={toggleCommentDeleted}
            toggleCommentError={toggleCommentError}
            key={comment.comment_id}
          />
        )
      })}
    </ul>
  )
}

export default CommentsList
