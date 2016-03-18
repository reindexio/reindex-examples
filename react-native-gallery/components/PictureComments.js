import React, {
  StyleSheet,
  View,
} from 'react-native';
import Relay from 'react-relay'

import { COLOR } from 'react-native-material-design';

import Comment from './Comment';

const PictureComments = (props) => (
  <View>
    {props.picture.comments.edges.map((edge, index) => (
      <Comment key={index} comment={edge.node} />
    ))}
  </View>
);

export default Relay.createContainer(PictureComments, {
  fragments: {
    picture: () => Relay.QL`
      fragment on Picture {
        id
        comments(first: 100000) {
          edges {
            node {
              ${Comment.getFragment('comment')}
            }
          }
        }
      }
    `,
  },
});
