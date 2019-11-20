import React, { Component } from 'react';
import * as api from '../api';
import { Alert } from 'react-bootstrap';
import ArticleCard from './ArticleCard';
import ArticleSelect from './ArticleSelect';
import ArticleForm from './ArticleForm';
import ErrorPage from './ErrorPage';

class ArticleList extends Component {
  state = {
    articleData: [],
    sort_by: 'created_at',
    order: 'desc',
    isLoading: true,
    error: null
  };

  render() {
    const { articleData, isLoading, error } = this.state;
    const { currentUser, loggedIn } = this.props;

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
        <div id="article-sub-menu">
          {this.props.topic
            ? <h2>
                newsbits/{this.props.topic}
              </h2>
            : <h2>Articles</h2>}
          {loggedIn
            ? <><h3>Post a new article</h3><ArticleForm currentUser={currentUser} renderNewArticle={this.renderNewArticle} /></>
            : <Alert variant="danger">Login to post new articles!</Alert>}
          <ArticleSelect updateSort={this.updateSort} />
        </div>
        <ul className="list">
          {articleData.map(article => {
            return <ArticleCard article={article} key={article.id} className="article-card" />;
          })}
        </ul>
      </main>
    );
  }

  componentDidMount() {
    this.fetchArticleData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.topic !== this.props.topic ||
      prevState.sort_by !== this.state.sort_by ||
      prevState.order !== this.state.order
    ) {
      this.fetchArticleData();
    }
  }

  fetchArticleData = () => {
    const { topic } = this.props;
    const { sort_by, order } = this.state;

    api
      .getArticles(topic, sort_by, order)
      .then(articleData => this.setState({ articleData, isLoading: false }))
      .catch(error => {
        const { status, statusText } = error.response;
        this.setState({ error: { status, msg: statusText }, isLoading: false });
      });
  };

  renderNewArticle = article => {
    this.setState(currentState => {
      return { articleData: [article, ...currentState.articleData] };
    });
  };

  toggleForm = () => {
    this.setState(currentState => {
      return { showForm: !currentState.showForm };
    });
  };

  updateSort = (sort_by, order) => {
    this.setState({ sort_by, order });
  };
}

export default ArticleList;
