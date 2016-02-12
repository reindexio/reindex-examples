import Relay from 'react-relay';

class MyPicturesRoute extends Relay.Route {}
MyPicturesRoute.routeName = 'MyPicturesRoute'
MyPicturesRoute.queries = {
  viewer: () => Relay.QL`
    query {
      viewer
    }
  `,
}

view MyPicturesRoute {
  <Relay.RootContainer
    {...{route: new MyPicturesRoute()}}
    Component={Motion.getView('MyPictures')} />
}
