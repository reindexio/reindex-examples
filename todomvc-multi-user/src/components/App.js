import React, {Component} from 'react';
import Relay from 'react-relay';

import Reindex from '../Reindex';
import Login from './Login';
import TodoApp from './TodoApp';
import AppRoute from '../routes/AppRoute';

export default class App extends Component {
  state = { isLoggedIn: Reindex.isLoggedIn() };

  handleLogin = (type) => {
    Reindex.login(type).catch((error) => {
      alert(error.message);
    });
  };

  handleLogout = () => {
    Reindex.logout();
  };

  handleTokenChange = () => {
    this.setState({ isLoggedIn: Reindex.isLoggedIn() });
  };

  componentDidMount() {
    Reindex.addListener('tokenChange', this.handleTokenChange);
  }

  componentWillUnmount() {
    Reindex.removeListener('tokenChange', this.handleTokenChange);
  }

  render() {
    if (this.state.isLoggedIn) {
      return (
        <Relay.RootContainer
          Component={TodoApp}
          route={new AppRoute}
          forceFetch={true}
          renderFetched={(data) =>
            <TodoApp {...data}
                     onLogout={this.handleLogout} />
          } />
      );
    } else {
      return (
        <Login onLogin={this.handleLogin} />
      );
    }
  }
}
