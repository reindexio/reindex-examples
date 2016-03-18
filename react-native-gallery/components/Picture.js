import React, {
  View,
  Image,
  Dimensions,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
} from 'react-native';
import Relay from 'react-relay'

import { COLOR, Icon } from 'react-native-material-design'

import PictureHeader from './PictureHeader';
import PictureComments from './PictureComments';
import AddComment from './AddComment';

const Picture = (props) => {
  let commentBar;
  let actionBar;
  if (props.showComments) {
    commentBar = (
      <View>
        <View style={styles.comments}>
          <PictureComments picture={props.picture} />
        </View>
        <View>
          <AddComment picture={props.picture} viewer={props.viewer} />
        </View>
      </View>
    );
    actionBar = (<View />);
  } else {
    actionBar = (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.SelectableBackground(
          COLOR.paperGrey300.color,
        )}
        onPress={props.onShowComments}>
          <View style={styles.actionButton}>
            <Text>
              VIEW COMMENTS
            </Text>
          </View>
      </TouchableNativeFeedback>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <PictureHeader picture={props.picture} />
      </View>
      <View style={styles.imgWrapper}>
        <Image
          style={styles.img}
          resizeMode="cover"
          source={{
            uri: `https://ucarecdn.com/${props.picture.uploadCareId}/-/scale_crop/600x600/`,
          }} />
      </View>
      <View style={styles.actionBar}>
        {actionBar}
        <View style={styles.commentCount}>
          <Icon size={32} name="comment" />
          <Text style={styles.commentNumber}>
            {props.picture.comments.count}
          </Text>
        </View>
      </View>
      {commentBar}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    borderRadius: 2,
    margin: 8,
    paddingLeft: 16,
    paddingRight: 16,
    elevation: 2,
  },
  header: {
    flex: 0,
  },
  imgWrapper: {
    flex: 0,
    left: -16,
  },
  img: {
    width: Dimensions.get('window').width - 16,
    height: Dimensions.get('window').width - 16,
  },
  actionBar: {
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  commentCount: {
    flexDirection: 'row',
  },
  showCommentsBar: {
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLOR.paperGrey300.color,
    marginLeft: -16,
    marginRight: -16,
  },
  actionButton: {
    paddingVertical: 8,
  },
  commentNumber: {
    marginLeft: 4,
    fontSize: 18,
    alignSelf: 'center',
    paddingBottom: 6,
  },
  comments: {
    flex: 1,
    backgroundColor: COLOR.googleGrey100.color,
    marginLeft: -16,
    marginRight: -16,
  },
});

export default Relay.createContainer(Picture, {
  fragments: {
    picture: () => Relay.QL`
      fragment on Picture {
        id
        uploadCareId
        comments {
          count
        }
        ${PictureHeader.getFragment('picture')}
        ${PictureComments.getFragment('picture')}
        ${AddComment.getFragment('picture')}
      }
    `,
    viewer: () => Relay.QL`
      fragment on ReindexViewer {
        ${AddComment.getFragment('viewer')}
      }
    `,
  },
});

// ${PictureComments.getFragment('picture')}
