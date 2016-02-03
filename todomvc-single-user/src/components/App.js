import React, {Component} from 'react';
import Relay from 'react-relay';

import Reindex from '../Reindex';
import TodoApp from './TodoApp';
import AppRoute from '../routes/AppRoute';

export default class App extends Component {
  render() {
    return (
      <Relay.RootContainer
        Component={TodoApp}
        route={new AppRoute}
        forceFetch={true} />
    );
  }
}
