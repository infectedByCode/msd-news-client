import React, { Component } from 'react';
import * as api from '../api';
import ArticleCard from './ArticleCard';
import ArticleSelect from './ArticleSelect';
import ArticleForm from './ArticleForm';

class ArticleList extends Component {
  state = {
    articleData: [],
    sort_by: 'created_at',
    order: 'desc',
    isLoading: true
  };

  render() {
    const { articleData, isLoading } = this.state;
    const { currentUser, loggedIn } = this.props;

    if (isLoading)
      return (
        <img
          id="loadingGif"
          src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif"
          alt="loading page"
        />
      );

    return (
      <main>
        <div id="article-sub-menu">
          {this.props.topic
            ? <h1>
                newsbits/{this.props.topic}
              </h1>
            : <h3>Articles</h3>}
          <ArticleSelect updateSort={this.updateSort} />
          {loggedIn && <ArticleForm currentUser={currentUser} renderNewArticle={this.renderNewArticle} />}
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

    api.getArticles(topic, sort_by, order).then(articleData => this.setState({ articleData, isLoading: false }));
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
