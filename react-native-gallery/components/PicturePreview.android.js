import React, {
  Component,
  View,
  TouchableNativeFeedback,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';

import { COLOR, Icon } from 'react-native-material-design';

const PicturePreview = (props) => (
  <View style={styles.container}>
    <Image
      style={styles.photo}
      resizeMode="cover"
      source={{
        uri: `https://ucarecdn.com/${props.image}/-/scale_crop/600x600/`,
      }} />
    <View style={styles.actionBar}>
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple(
          COLOR.paperBlue800.color,
          true
        )}
        onPress={props.onCancel}>
        <View>
          <Icon
            name="clear"
            color={COLOR.paperGrey200.color}
            size={64} />
        </View>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple(
          COLOR.paperBlue800.color,
          true
        )}
        onPress={props.onConfirm}>
        <View>
          <Icon
            name="done"
            color={COLOR.paperGrey200.color}
            size={64} />
        </View>
      </TouchableNativeFeedback>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  photo: {
    flex: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
    backgroundColor: COLOR.paperGrey900.color,
  },
  actionBar: {
    backgroundColor: COLOR.paperGrey900.color,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default PicturePreview;
