import React from 'react-native';
import Relay from 'react-relay';

import { PICTURE_ROUTE } from '../Routes';
import PaginatedGallery from './PaginatedGallery';

const MyPictures = (props) => (
  <PaginatedGallery
    user={props.viewer.user}
    onPress={(id) => {
      props.navigator.push({
        ...PICTURE_ROUTE,
        index: props.route.index + 1,
        id,
      });
    }} />
);

export default Relay.createContainer(MyPictures, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on ReindexViewer {
        user {
          id
          ${PaginatedGallery.getFragment('user')}
        }
      }
    `,
  },
});
