import React, {
  View,
} from 'react-native';
import Relay from 'react-relay';

import Spinner from 'react-native-loading-spinner-overlay';

import AddPicture from '../components/AddPicture';

class AddPictureRoute extends Relay.Route {
  static routeName = 'AddPictureRoute';
  static queries = {
    viewer: () => Relay.QL`
      query {
        viewer
      }
    `,
  };
}

const AddPictureRouteComponent = (props) => (
  <Relay.RootContainer
    route={new AddPictureRoute()}
    Component={AddPicture}
    renderLoading={() => (
      <View style={{ flex: 1 }}>
        <Spinner visible />
      </View>
    )}
    renderFetched={(data) => (
      <AddPicture
        route={props.route}
        navigator={props.navigator}
        {...data} />
    )} />
);

export default AddPictureRouteComponent;
