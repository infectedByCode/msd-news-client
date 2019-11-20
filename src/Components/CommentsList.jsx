import React from 'react'
import CommentCard from './CommentCard'

const CommentsList = props => {
  const { comments, currentUser, filterComments, toggleCommentDeleted, loggedIn, updateCommentVote } = props

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
            key={comment.comment_id}
            updateCommentVote={updateCommentVote}
          />
        )
      })}
    </ul>
  )
}

export default CommentsList
