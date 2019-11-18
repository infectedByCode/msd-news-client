import React, { Component } from 'react';
import * as api from '../api';

class CommentForm extends Component {
  state = {
    commentInput: ''
  };

  render() {
    const { commentInput } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Having something to say....?
          <textarea value={commentInput} onChange={this.handleInput} required />
        </label>
        <button className="btn-primary">Post Comment</button>
      </form>
    );
  }

  handleInput = e => {
    const commentInput = e.target.value;
    this.setState({ commentInput });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { id, currentUser, renderNewComment } = this.props;
    const { commentInput } = this.state;
    api.postCommentByArticleId(id, commentInput, currentUser).then(comment => {
      renderNewComment(comment);
      this.setState({ commentInput: '' });
    });
  };
}

export default CommentForm;
