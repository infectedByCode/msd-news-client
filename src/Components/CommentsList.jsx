import React from 'react'
import CommentCard from './CommentCard'

const CommentsList = props => {
  const { comments, currentUser, fetchComments, toggleCommentDeleted } = props

  return (
    <ul>
      {comments.map(comment => {
        return (
          <CommentCard
            comment={comment}
            currentUser={currentUser}
            fetchComments={fetchComments}
            toggleCommentDeleted={toggleCommentDeleted}
            key={comment.comment_id}
          />
        )
      })}
    </ul>
  )
}

export default CommentsList
