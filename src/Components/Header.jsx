import React, { Component } from 'react';
import { Link } from '@reach/router';

class Header extends Component {
  state = {
    user: 'weegembump'
  };

  handleSubmit = e => {
    const { user } = this.state;
    const URL = document.URL;
    this.props.handleSignIn(user, URL);
  };

  handleChange = e => {
    const user = e.target.value;
    this.setState({ user });
  };

  render() {
    const { currentUser, loggedIn } = this.props;

    return (
      <header>
        <nav>
          <Link id="logo" to="/">
            newsBits
          </Link>
          <Link to="/">Home</Link>
          <form onSubmit={this.handleSubmit}>
            {!loggedIn &&
              <select onChange={this.handleChange}>
                {loggedIn &&
                  <option value={currentUser}>
                    Logged in as {currentUser}
                  </option>}
                <option value="weegembump">weegembump</option>
                <option value="jessjelly">jessjelly</option>
                <option value="happyamy2016">happyamy2016</option>
                <option value="grumpy19">grumpy19</option>
                <option value="tickle122">tickle122</option>
                <option value="cooljmessy">cooljmessy</option>
              </select>}
            <button>
              {loggedIn ? 'Logout' : 'Login'}
            </button>
          </form>
          <Link to={`/users/${currentUser}`}>
            {loggedIn && <p>View Profile</p>}
          </Link>
        </nav>
      </header>
    );
  }
}

export default Header;
