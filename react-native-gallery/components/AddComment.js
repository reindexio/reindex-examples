import React, {
  Component,
  TextInput,
  View,
  StyleSheet,
} from 'react-native';
import Relay from 'react-relay';

import { COLOR } from 'react-native-material-design';

import Button from './Button';
import AddCommentMutation from '../mutations/AddCommentMutation'

class AddComment extends Component {
  constructor() {
    super();
    this.state = {
      comment: '',
    };
  }

  sendComment = () => {
    Relay.Store.commitUpdate(new AddCommentMutation({
      viewer: this.props.viewer,
      picture: this.props.picture,
      text: this.state.comment,
    }));
    this.setState({
      comment: '',
    });
  }

  render() {
    const canSend = this.state.comment.length > 0;
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Add comment"
          placeholderTextColor={COLOR.paperGrey300.color}
          value={this.state.comment}
          onChangeText={(comment) => { this.setState({ comment }); }} />
        <Button
          icon="send"
          style={styles.button}
          size={48}
          onPress={canSend ? this.sendComment : null}
          iconColor={
            canSend ?
            '#FFF' :
            COLOR.googleGrey500.color
          }
          backgroundColor={
            canSend ?
            COLOR.googleGreen300.color :
            COLOR.googleGrey300.color
          }
          touchColor={COLOR.paperGrey500.color} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderTopColor: COLOR.paperGrey300.color,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -16,
    marginRight: -16,
    padding: 8,
  },
  input: {
    flex: 1,
  },
  button: {
    flex: 0,
    marginLeft: 16,
  },
});

export default Relay.createContainer(AddComment, {
  fragments: {
    picture: () => Relay.QL`
     fragment on Picture {
       ${AddCommentMutation.getFragment('picture')}
     }
    `,
    viewer: () => Relay.QL`
      fragment on ReindexViewer {
        ${AddCommentMutation.getFragment('viewer')}
      }
    `,
  },
});
