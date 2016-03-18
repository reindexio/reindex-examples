import React, {
  View,
} from 'react-native';
import Relay from 'react-relay';

import Spinner from 'react-native-loading-spinner-overlay';

import Stream from '../components/Stream';

class StreamRoute extends Relay.Route {
  static routeName = 'StreamRoute';
  static queries = {
    viewer: () => Relay.QL`
      query {
        viewer
      }
    `,
  };
}

const StreamRouteComponent = (props) => (
  <Relay.RootContainer
    route={new StreamRoute()}
    Component={Stream}
    renderLoading={() => (
      <View style={{ flex: 1 }}>
        <Spinner visible />
      </View>
    )}
    renderFetched={(data) => (
      <Stream
        route={props.route}
        navigator={props.navigator}
        {...data} />
    )} />
);

export default StreamRouteComponent;
