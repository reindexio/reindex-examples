import React, {
  View,
} from 'react-native';
import Relay from 'react-relay';

import Spinner from 'react-native-loading-spinner-overlay';

import MyPictures from '../components/MyPictures';

class MyPicturesRoute extends Relay.Route {
  static routeName = 'MyPicturesRoute';
  static queries = {
    viewer: () => Relay.QL`
      query {
        viewer
      }
    `,
  };
}

const MyPicturesRouteContainer = (props) => (
  <Relay.RootContainer
    route={new MyPicturesRoute()}
    Component={MyPictures}
    renderLoading={() => (
      <View style={{ flex: 1 }}>
        <Spinner visible />
      </View>
    )}
    renderFetched={(data) => (
      <MyPictures
        route={props.route}
        navigator={props.navigator}
        {...data} />
    )} />
);

export default MyPicturesRouteContainer;
