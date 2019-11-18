import React, { Component } from 'react';
import * as api from '../api';

import ArticleCard from './ArticleCard';

class ArticleList extends Component {
  state = {
    articleData: [],
    isLoading: true
  };

  render() {
    const { articleData, isLoading } = this.state;

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
        {this.props.topic
          ? <h1>
              newsbits/{this.props.topic}
            </h1>
          : <h3>Articles</h3>}
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

  componentDidUpdate(prevProps) {
    if (prevProps.topic !== this.props.topic) this.fetchArticleData();
  }

  fetchArticleData = () => {
    const { topic } = this.props;
    api.getArticles(topic).then(articleData => this.setState({ articleData, isLoading: false }));
  };
}

export default ArticleList;
