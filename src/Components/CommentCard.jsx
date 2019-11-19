import React from 'react'
import { Button } from 'react-bootstrap'
import Timestamp from 'react-timestamp'
import { TiArrowUpOutline, TiArrowDownOutline } from 'react-icons/ti'
import * as api from '../api'

const CommentCard = props => {
  const { author, created_at, body, comment_id } = props.comment
  let { votes } = props.comment
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

  const handleVote = e => {
    const vote = e.target.id === 'upvote-icon' ? 1 : -1
    votes += vote
    // Update DB
    // api.patchArticleById(id, vote)
    alert(votes)
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
        <TiArrowUpOutline id='upvote-icon' className='vote-icons' onClick={handleVote} />
        <TiArrowDownOutline id='downvote-icon' className='vote-icons' onClick={handleVote} />
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
