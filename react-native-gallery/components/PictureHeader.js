import React, {
  View,
  StyleSheet,
  Text,
  Image,
} from 'react-native';
import Relay from 'react-relay';
import moment from 'moment';

import { Avatar } from 'react-native-material-design';

const PictureHeader = (props) => (
  <View style={styles.container}>
    <Avatar image={<Image source={{
      uri: props.picture.user.avatarUrl
    }} />} />
    <View style={styles.text}>
      <Text style={styles.nick}>
        {props.picture.user.username}
      </Text>
      <Text style={styles.when}>
        {moment(props.picture.createdAt).fromNow()}
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },

  text: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 16,
  },

  nick: {
    flex: 0,
    color: 'black',
  },

  when: {
    flex: 0,
    fontSize: 10,
  },
});

export default Relay.createContainer(PictureHeader, {
  fragments: {
    picture: () => Relay.QL`
      fragment on Picture {
        id
        createdAt
        user {
          id
          username
          avatarUrl
        }
      }
    `,
  },
});
