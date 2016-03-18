import React, {
  View,
  StyleSheet,
  Text,
  Image,
} from 'react-native';
import Relay from 'react-relay';
import moment from 'moment'

import { Avatar, COLOR } from 'react-native-material-design';

const Comment = (props) => (
  <View style={styles.container}>
    <Avatar image={<Image source={{
      uri: props.comment.user.avatarUrl
    }} />} />
    <View style={styles.textWrapper}>
      <View style={styles.header}>
        <Text style={styles.author}>
          {props.comment.user.username}
        </Text>
      </View>
      <Text style={COLOR.paperGrey800}>
        {props.comment.text}
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: COLOR.paperGrey300.color,
    padding: 16,
  },

  textWrapper: {
    marginLeft: 16,
    marginRight: 8,
    flex: 1,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  author: {
    color: 'black',
    fontWeight: '400',
  },
});

export default Relay.createContainer(Comment, {
  fragments: {
    comment: () => Relay.QL`
      fragment on PictureComment {
        text
        user {
          id
          username
          avatarUrl
        }
      }
    `,
  },
});
