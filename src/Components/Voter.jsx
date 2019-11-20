import React, { Component } from 'react';
import * as api from '../api'

class Voter extends Component {
  render() {

    return (
      <>
        <div>
          <button id='upvote' className='vote-btn' onClick={this.handleVote}>
             &#8679;
        </button>
          <button id='downvote' className='vote-btn' onClick={this.handleVote}>
             &#8681;
        </button>
        </div>
        </>
    );
  }

  handleVote = (e) => {
    const { comment_id, article_id, updateArticleVote, updateCommentVote} = this.props
    const vote = e.target.id === 'upvote' ? 1 : -1
    // Update DB for comments
    if (comment_id) {
      api.patchCommentById(comment_id, vote)
      updateCommentVote(vote, comment_id)
    }
    // Update DB for articles
    if (article_id) {
      api.patchArticleById(article_id, vote);
      updateArticleVote(vote)
    }
  }
}

export default Voter;