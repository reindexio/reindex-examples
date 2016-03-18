import React, {
  ScrollView,
} from 'react-native';
import Relay from 'react-relay';

import Picture from './Picture';

const SinglePicture = (props) => (
  <ScrollView>
    <Picture
      picture={props.picture}
      viewer={props.viewer}
      showComments={true} />
  </ScrollView>
);

export default Relay.createContainer(SinglePicture, {
  fragments: {
    picture: () => Relay.QL`
      fragment on Picture {
        ${Picture.getFragment('picture')}
      }
    `,
    viewer: () => Relay.QL`
      fragment on ReindexViewer {
        ${Picture.getFragment('viewer')}
      }
    `,
  },
});
