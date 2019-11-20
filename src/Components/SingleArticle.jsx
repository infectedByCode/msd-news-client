import React, { Component } from 'react';
import Timestamp from 'react-timestamp';
import { Alert } from 'react-bootstrap';
import * as api from '../api';
import CommentsList from './CommentsList';
import CommentForm from './CommentForm';
import { navigate } from '@reach/router';
import ErrorPage from './ErrorPage';
import Voter from './Voter';

class SingleArticle extends Component {
  state = {
    article: {},
    comments: [],
    isLoading: true,
    commentDeleted: false,
    error: null
  };

  componentDidMount() {
    this.fetchArticle();
    this.fetchComments();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.id !== this.props.id || prevState.comments !== this.state.comments) {
      this.fetchArticle();
    }
  }

  render() {
    const { title, body, votes, topic, author, comment_count, created_at } = this.state.article;
    const { comments, isLoading, commentDeleted, error } = this.state;
    const { currentUser, id, loggedIn } = this.props;

    if (isLoading) {
      return (
        <img
          id="loadingGif"
          src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif"
          alt="loading page"
        />
      );
    }
    if (error) return <ErrorPage error={error} />;

    return (
      <main>
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
          <p>
            {body}
          </p>
          <p>
            <span>
              votes: {votes}
            </span>
            <span>
              comments:{comment_count}
            </span>
          </p>
          <Timestamp relative date={created_at} />
          {loggedIn && <Voter updateArticleVote={this.updateArticleVote} article_id={id} />}
          {currentUser === author &&
            <button className="btn-danger" onClick={this.handleDeleteArticle}>
              Delete this
            </button>}
        </article>
        <section>
          {loggedIn
            ? <CommentForm currentUser={currentUser} id={id} renderNewComment={this.renderNewComment} />
            : <Alert variant="danger">Please log in to post comments!</Alert>}
          {commentDeleted && <Alert variant="success">Comment removed!</Alert>}
          <CommentsList
            comments={comments}
            loggedIn={loggedIn}
            filterComments={this.filterComments}
            currentUser={currentUser}
            updateCommentVote={this.updateCommentVote}
            toggleCommentDeleted={this.toggleCommentDeleted}
          />
        </section>
      </main>
    );
  }

  fetchArticle = () => {
    const { id } = this.props;

    api.getArticleById(id).then(article => this.setState({ article, isLoading: false })).catch(error => {
      const { status, statusText } = error.response;
      this.setState({ error: { status, msg: statusText }, isLoading: false });
    });
  };

  fetchComments = () => {
    const { id } = this.props;

    api.getCommentsByArticleId(id).then(comments => this.setState({ comments })).catch(error => {
      const { status, statusText } = error.response;
      this.setState({ error: { status, msg: statusText }, isLoading: false });
    });
  };

  filterComments = comment_id => {
    this.setState(currentState => {
      const commentsCopy = [...currentState.comments];
      const filteredComments = commentsCopy.filter(comment => comment.comment_id !== comment_id);

      this.setState({ comments: filteredComments });
    });
  };

  renderNewComment = comment => {
    this.setState(currentState => {
      return { comments: [comment, ...currentState.comments] };
    });
  };

  toggleCommentDeleted = () => {
    this.setState(currentState => ({ commentDeleted: !currentState.commentDeleted }));
  };

  updateArticleVote = vote => {
    //Set state using shallow copy for speed.
    this.setState(currentState => {
      const articleCopy = { ...currentState.article };
      vote === 1 ? articleCopy.votes++ : articleCopy.votes--;

      return { article: articleCopy };
    });
  };

  updateCommentVote = (vote, comment_id) => {
    //Set state using shallow copy for speed.
    this.setState(currentState => {
      const commentsCopy = [...currentState.comments];
      commentsCopy.forEach(comment => (comment.comment_id === comment_id ? (comment.votes += vote) : null));

      return { article: commentsCopy };
    });
  };

  handleDeleteArticle = () => {
    const { id } = this.props;
    api
      .deleteArticleById(id)
      .then(status => {
        if (status === 204) navigate('/');
      })
      .catch(error => console.log(error.response));
  };
}

export default SingleArticle;
