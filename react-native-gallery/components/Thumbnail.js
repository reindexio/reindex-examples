import React, {
  Image,
  View,
  TouchableHighlight,
} from 'react-native';
import Relay from 'react-relay';

const Thumbnail = (props) => (
  <TouchableHighlight onPress={props.onPress}>
    <Image
      source={{
        uri: `https://ucarecdn.com/${props.picture.uploadCareId}/-/scale_crop/200x200/`
      }}
      style={props.style} />
  </TouchableHighlight>
);

export default Relay.createContainer(Thumbnail, {
  fragments: {
    picture: () => Relay.QL`
      fragment on Picture {
        id
        uploadCareId
      }
    `,
  },
});
