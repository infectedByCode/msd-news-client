import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Router, navigate } from '@reach/router';
import Header from './Components/Header';
import Homepage from './Components/Homepage';
import SingleTopic from './Components/SingleTopic';
import SingleArticle from './Components/SingleArticle';
import ErrorPage from './Components/ErrorPage';
import Footer from './Components/Footer';
import User from './Components/User';

class App extends Component {
  state = {
    currentUser: '',
    loggedIn: false
  };

  render() {
    const { currentUser, loggedIn } = this.state;
    return (
      <div className="App">
        <Header currentUser={currentUser} loggedIn={loggedIn} handleSignIn={this.handleSignIn} />
        <Router>
          <Homepage currentUser={currentUser} loggedIn={loggedIn} path="/" />
          <SingleTopic path="/topic/:topic" currentUser={currentUser} loggedIn={loggedIn} />
          <SingleArticle currentUser={currentUser} loggedIn={loggedIn} path="/articles/:id" />
          <User currentUser={currentUser} loggedIn={loggedIn} path="/users/:username" />
          <ErrorPage error={{ status: 404, msg: 'Page not found.' }} path="/*" />
        </Router>
        <Footer />
      </div>
    );
  }

  componentDidMount() {
    const { currentUser, loggedIn } = this.state;
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.loggedIn) {
      this.setState({ currentUser: user.currentUser, loggedIn: true });
    } else {
      localStorage.setItem('user', JSON.stringify({ currentUser: currentUser, loggedIn: loggedIn }));
    }
  }

  handleSignIn = (user, URL) => {
    this.setState(currentState => {
      if (currentState.currentUser) {
        localStorage.setItem('user', JSON.stringify({ currentUser: '', loggedIn: false }));
        return { currentUser: '', loggedIn: false };
      } else {
        localStorage.setItem('user', JSON.stringify({ currentUser: user, loggedIn: true }));
        return { currentUser: user, loggedIn: true };
      }
    });
    if (URL.includes('/users/')) navigate('/');
    else navigate(URL);
  };
}

export default App;
