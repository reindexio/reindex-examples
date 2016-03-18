import React, {
  View,
} from 'react-native';
import Relay from 'react-relay';

import Spinner from 'react-native-loading-spinner-overlay';

import SinglePicture from '../components/SinglePicture';

class PictureRoute extends Relay.Route {
  static routeName = 'PictureRoute';
  static queries = {
    picture: () => Relay.QL`
      query {
        pictureById(id: $pictureId)
      }
    `,
    viewer: () => Relay.QL`
      query {
        viewer
      }
    `,
  };
  static paramDefinitions = {
    pictureId: {required: true},
  };
}

const PictureRouteComponent = (props) => (
  <Relay.RootContainer
    route={new PictureRoute({
      pictureId: props.route.id,
    })}
    Component={SinglePicture}
    renderLoading={() => (
      <View style={{ flex: 1 }}>
        <Spinner visible />
      </View>
    )}
    renderFetched={(data) => (
      <SinglePicture
        route={props.route}
        navigator={props.navigator}
        {...data} />
    )} />
);

export default PictureRouteComponent;
