import React, {
  Component,
  View,
  Dimensions,
  StyleSheet,
  TouchableNativeFeedback,
} from 'react-native';
import RNCamera from 'react-native-camera';
import { COLOR, Icon } from 'react-native-material-design';

export default class Camera extends Component {
  handleTakePicture = async () => {
    const filePath = await this.cameraRef.capture();
    this.props.onTakenPicture(filePath);
  };

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={((camera) => { this.cameraRef = camera; })}
          captureTarget={RNCamera.constants.CaptureTarget.disk}
          aspect={RNCamera.constants.Aspect.fill}
          style={styles.camera} />
        <View style={styles.actionBar}>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple(
              COLOR.paperBlue800.color,
              true
            )}
            onPress={this.handleTakePicture}>
            <View>
              <Icon
                name="camera-alt"
                color={COLOR.paperGrey200.color}
                size={64} />
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  camera: {
    flex: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
    backgroundColor: COLOR.paperGrey900.color,
  },
  actionBar: {
    backgroundColor: COLOR.paperGrey900.color,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
