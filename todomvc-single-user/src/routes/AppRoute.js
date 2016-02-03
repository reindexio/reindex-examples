import Relay from 'react-relay';

export default class AppRoute extends Relay.Route {
  static queries = {
    viewer: () => Relay.QL`query { viewer }`,
  };
  static routeName = 'AppRoute';
}
