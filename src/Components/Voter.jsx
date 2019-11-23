import React, { Component } from 'react';
import * as api from '../api';

class Voter extends Component {
  state = {
    voteChange: 0
  };

  render() {
    const { votes } = this.props;
    const { voteChange } = this.state;

    return (
      <div className="vote-block">
        <button id="upvote" className="vote-btn" onClick={e => this.handleVote(e, 1)}>
          &#8679;
        </button>
        <p>
          &#9733; {votes + voteChange}
        </p>
        <button id="downvote" className="vote-btn" onClick={e => this.handleVote(e, -1)}>
          &#8681;
        </button>
      </div>
    );
  }

  componentDidMount() {
    this.disableButtons();
  }

  disableButtons = () => {
    const { currentUser } = this.props;
    const buttons = document.querySelectorAll('.vote-btn');

    if (currentUser === '') {
      buttons.forEach(button => {
        button.disabled = true;
        button.classList.add('not-vote');
      });
    }
  };

  handleVote = (e, voteValue) => {
    this.styleVoteBtns(e, voteValue);
    const { comment_id, article_id } = this.props;

    // Update visable state
    this.setState(currentState => {
      return { voteChange: currentState.voteChange + voteValue };
    });

    // Update DB for comments
    if (comment_id)
      api.patchCommentById(comment_id, voteValue).catch(() => {
        this.setState(currentState => {
          return { voteChange: currentState.voteChange - voteValue };
        });
      });

    // Update DB for articles
    if (article_id)
      api.patchArticleById(article_id, voteValue).catch(() => {
        this.setState(currentState => {
          return { voteChange: currentState.voteChange - voteValue };
        });
      });
  };

  styleVoteBtns = (e, voteValue) => {
    const button = e.target;

    if (this.state.voteChange + voteValue >= 1 && button.id === 'upvote') {
      button.classList.add('not-vote');
      button.disabled = true;
    }

    if (this.state.voteChange + voteValue <= -1 && button.id === 'downvote') {
      button.classList.add('not-vote');
      button.disabled = true;
    }

    if (this.state.voteChange + voteValue === 0) {
      if (button.id === 'downvote') {
        const upBtn = e.target.parentElement.firstChild;
        upBtn.disabled = false;
        upBtn.classList.remove('not-vote');
      } else {
        const downBtn = e.target.parentElement.lastChild;
        downBtn.disabled = false;
        downBtn.classList.remove('not-vote');
      }
    }
  };
}

export default Voter;
