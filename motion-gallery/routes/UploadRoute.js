import Relay from 'react-relay'

class UploadRoute extends Relay.Route {}
UploadRoute.routeName = 'UploadRoute'
UploadRoute.queries = {
  viewer: () => Relay.QL`
    query {
      viewer
    }
  `,
}

view UploadRoute {
  <Relay.RootContainer
    {...{route: new UploadRoute()}}
    Component={Motion.getView('Upload')} />
}
