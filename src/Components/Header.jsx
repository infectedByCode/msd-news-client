import React, { Component } from 'react';
import { Link } from '@reach/router';

class Header extends Component {
  state = {
    user: 'weegembump'
  };

  handleSubmit = e => {
    const { user } = this.state;

    this.props.handleSignIn(user);
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
                {loggedIn && <option value={currentUser}>Logged in as {currentUser}</option>}
            <>
                <option value="weegembump">weegembump</option>
                <option value="jessjelly">jessjelly</option>
                </>
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
