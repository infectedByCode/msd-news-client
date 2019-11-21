import React, { Component } from 'react';
import ErrorPage from './ErrorPage';
import ArticleList from './ArticleList';
import * as api from '../api';

class User extends Component {
  state = {
    userData: {},
    isLoading: true,
    error: null
  };

  render() {
    const { userData: { username, name, avatar_url }, isLoading, error } = this.state;
    const { currentUser, loggedIn } = this.props;
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
          <ArticleList author={username} loggedIn={loggedIn} currentUser={currentUser} />
        </aside>
      </main>
    );
  }

  componentDidMount() {
    this.fetchUserData();
  }

  fetchUserData = () => {
    const { username } = this.props;

    api.getUser(username).then(user => this.setState({ userData: user, isLoading: false })).catch(error => {
      const { status, msg } = error.response;
      this.setState({ error: { status, msg }, isLoading: false });
    });
  };
}

export default User;
