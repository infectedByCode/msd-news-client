import React, { Component } from 'react';
import ErrorPage from './ErrorPage';
import ArticleCard from './ArticleCard';
import * as api from '../api';

class User extends Component {
  state = {
    userData: {},
    userArticles: [],
    isLoading: true,
    error: null
  };

  render() {
    const { userData: { username, name, avatar_url }, userArticles, isLoading, error } = this.state;
    if (isLoading)
      return (
        <img
          id="loadingGif"
          src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif"
          alt="loading page"
        />
      );

    if (error) return <ErrorPage error={error} />;

    return (
      <main>
        <section id="user-profile">
          <img src={avatar_url} alt={`${name} profile`} />
          <h1>
            {username}
          </h1>
          <h2>
            {name}
          </h2>
        </section>
        <aside id="user-articles">
          {userArticles.map(article => {
            return <ArticleCard key={article.id} article={article} />;
          })}
        </aside>
      </main>
    );
  }

  componentDidMount() {
    this.fetchUserData();
    this.fetchArticlesByUser();
  }

  fetchUserData = () => {
    const { username } = this.props;

    api.getUser(username).then(user => this.setState({ userData: user, isLoading: false })).catch(error => {
      const { status, msg } = error.response;
      this.setState({ error: { status, msg }, isLoading: false });
    });
  };

  fetchArticlesByUser = () => {
    const { username } = this.props;

    api
      .getArticles(undefined, undefined, undefined, username)
      .then(articles => {
        this.setState({ userArticles: articles });
      })
      .catch(error => {
        const { status, msg } = error.response;
        this.setState({ error: { status, msg }, isLoading: false });
      });
  };
}

export default User;
