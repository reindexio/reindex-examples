import Relay from 'react-relay'

class StreamRoute extends Relay.Route {}
StreamRoute.routeName = 'StreamRoute'
StreamRoute.queries = {
  viewer: () => Relay.QL`
    query {
      viewer
    }
  `,
}

view StreamRoute {
  <Relay.RootContainer
    {...{route: new StreamRoute()}}
    Component={Motion.getView('Stream')} />
}
