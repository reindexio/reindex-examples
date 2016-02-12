import Relay from 'react-relay';

class PictureRoute extends Relay.Route {}
PictureRoute.routeName = 'PictureRoute';
PictureRoute.queries = {
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
PictureRoute.paramDefinitions = {
  pictureId: {required: true},
};

view PictureRoute {
  <Relay.RootContainer
    {...{route: new PictureRoute({
      pictureId: view.props.params.id,
    })}}
    Component={Motion.getView('SinglePicture')} />
}
