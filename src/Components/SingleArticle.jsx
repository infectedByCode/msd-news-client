import React, { Component } from 'react';
import Timestamp from 'react-timestamp';
import { Alert } from 'react-bootstrap';
import * as api from '../api';
import CommentsList from './CommentsList';
import CommentForm from './CommentForm';

class SingleArticle extends Component {
  state = {
    article: {},
    comments: [],
    isLoading: true
  };

  render() {
    const { title, body, votes, topic, author, comment_count, created_at } = this.state.article;
    const { comments, isLoading } = this.state;
    const { currentUser, id, loggedIn } = this.props;

    if (isLoading)
      return (
        <img
          id="loadingGif"
          src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif"
          alt="loading page"
        />
      );

    return (
      <section>
        {/* Change it to be a component */}
        <h2>
          newsbits/{topic}
        </h2>
        <article>
          <h3>
            {title}
            <br />
            <span>
              {author}
            </span>
          </h3>
          <h4>
            {body}
          </h4>
          <p>
            votes: {votes}
            comments:{comment_count}
          </p>
          <Timestamp relative date={created_at} />
        </article>
        <main>
          {loggedIn
            ? <CommentForm currentUser={currentUser} id={id} renderNewComment={this.renderNewComment} />
            : <Alert variant="danger">Please log in to post comments!</Alert>}
          <CommentsList comments={comments} currentUser={currentUser} />
        </main>
      </section>
    );
  }

  componentDidMount() {
    this.fetchArticle();
    this.fetchComments();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.id !== this.props.id || prevState.comments !== this.state.comments) {
      this.fetchArticle();
    }
  }

  fetchArticle = () => {
    const { id } = this.props;

    api.getArticleById(id).then(article => this.setState({ article, isLoading: false }));
  };

  fetchComments = () => {
    const { id } = this.props;

    api.getCommentsByArticleId(id).then(comments => this.setState({ comments }));
  };

  renderNewComment = comment => {
    this.setState(currentState => {
      return { comments: [comment, ...currentState.comments] };
    });
  };
}

export default SingleArticle;
