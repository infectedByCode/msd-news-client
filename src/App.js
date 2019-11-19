import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Router } from '@reach/router';
import Header from './Components/Header';
import Homepage from './Components/Homepage';
import SingleTopic from './Components/SingleTopic';
import SingleArticle from './Components/SingleArticle';

class App extends Component {
  state = {
    currentUser: 'jessjelly',
    loggedIn: true
  };

  render() {
    const { currentUser, loggedIn } = this.state;
    return (
      <div className="App">
        <Header currentUser={currentUser} loggedIn={loggedIn} />
        <Router>
          <Homepage currentUser={currentUser} loggedIn={loggedIn} path="/" />
          <SingleTopic path="/topic/:topic" />
          <SingleArticle currentUser={currentUser} loggedIn={loggedIn} path="/articles/:id" />
        </Router>
      </div>
    );
  }
}

export default App;
