import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Router } from '@reach/router';
import Header from './Components/Header';
import Homepage from './Components/Homepage';
import SingleTopic from './Components/SingleTopic';
import SingleArticle from './Components/SingleArticle';
import ErrorPage from './Components/ErrorPage';

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
          <ErrorPage error={{ status: 404, msg: 'Page not found.' }} default />
        </Router>
      </div>
    );
  }

  handleSignIn = user => {
    this.setState(currentState => {
      if (currentState.currentUser) return { currentUser: '', loggedIn: false };
      else return { currentUser: user, loggedIn: true };
    });
  };
}

export default App;
