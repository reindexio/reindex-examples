import React, {
  TouchableNativeFeedback,
  View,
} from 'react-native';

import { Icon } from 'react-native-material-design';

const Button = (props) => (
  <TouchableNativeFeedback
    background={TouchableNativeFeedback.Ripple(
      props.touchColor,
      true
    )}
    onPress={props.onPress}>
    <View style={{
      backgroundColor: props.backgroundColor,
      borderRadius: props.size,
      height: props.size,
      width: props.size,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Icon
        name={props.icon}
        color={props.iconColor}
        size={props.size * 0.6} />
    </View>
  </TouchableNativeFeedback>
);

export default Button;
