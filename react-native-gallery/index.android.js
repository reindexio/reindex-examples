import React, {
  AppRegistry,
  Component,
} from 'react-native';

import Main from './Main';

/* eslint-disable react/prefer-stateless-function */
class ReindexInsta extends Component {
  render() {
    return <Main />;
  }
}
/* eslint-enable react/prefer-stateless-function */

AppRegistry.registerComponent('ReindexInsta', () => ReindexInsta);
