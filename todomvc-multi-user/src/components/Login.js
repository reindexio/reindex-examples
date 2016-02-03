import React, {Component} from 'react';

import Reindex from '../Reindex';

export default class Login extends Component {
  handleLogin = (type, e) => {
    e.preventDefault();
    if (this.props.onLogin) {
      this.props.onLogin(type);
    }
  }

  render() {
    return (
      <div>
        <h1>Welcome to Reindex TodoMVC!</h1>
        <div>
          <a href="#" onClick={this.handleLogin.bind(this, 'google')}>
            Login with Google
          </a>
        </div>
        <div>
          <a href="#" onClick={this.handleLogin.bind(this, 'github')}>
            Login with Github
          </a>
        </div>
      </div>
    );
  }
}
