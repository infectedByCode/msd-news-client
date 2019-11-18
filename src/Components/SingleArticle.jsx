import React, { Component } from 'react';
import Timestamp from 'react-timestamp';
import * as api from '../api';

class SingleArticle extends Component {
  state = {
    article: {},
    comments: []
  };

  render() {
    const { title, body, votes, topic, author, comment_count, created_at } = this.state.article;

    return (
      <section>
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
        <main />
      </section>
    );
  }

  componentDidMount() {
    this.fetchArticle();
    this.fetchComments();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.fetchArticle();
    }
  }

  fetchArticle = () => {
    const { id } = this.props;

    api.getArticleById(id).then(article => this.setState({ article }));
  };

  fetchComments = () => {
    const { id } = this.props;

    api.getCommentsByArticleId(id).then(comments => this.setState({ comments }));
  };
}

export default SingleArticle;
