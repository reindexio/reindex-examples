import React, {
  Component,
  Text,
  DrawerLayoutAndroid,
  Navigator,
  StyleSheet,
  View,
  BackAndroid,
} from 'react-native';
import { Toolbar, Drawer, COLOR, TYPO } from 'react-native-material-design';

import { ADD_PHOTO_ROUTE, PROFILE_ROUTE } from '../Routes';

export default class SceneWrapper extends Component {
  static propTypes = {
    children: React.PropTypes.element,
    navigator: React.PropTypes.instanceOf(Navigator),
    route: React.PropTypes.any,
    onLogout: React.PropTypes.func.isRequired,
  };

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  getDrawer = () => (
    <Drawer>
      <Drawer.Header>
        <Text style={[
          styles.headerText,
          COLOR.paperGrey50,
          TYPO.paperFontSubhead,
        ]}>
          Reindex Gallery
        </Text>
      </Drawer.Header>
      <Drawer.Section
        items={[
          {
            icon: 'camera',
            value: 'Picture',
            onPress: this.handlePicture,
            onLongPress: this.handlePicture,
          },
          {
            icon: 'portrait',
            value: 'Profile',
            onPress: this.handleProfile,
            onLongPress: this.handleProfile,
          },
          {
            icon: 'exit-to-app',
            value: 'Logout',
            onPress: this.handleLogout,
            onLongPress: this.handleLogout,
          },
        ]} />
    </Drawer>
  );

  handleBackPress = () => {
    if (this.props.route.index > 0) {
      this.props.navigator.pop();
      return true;
    } else {
      return false;
    }
  }

  handleToolbarPress = () => {
    this.drawerRef.openDrawer();
  }

  handlePicture = () => {
    this.drawerRef.closeDrawer();
    this.props.navigator.push({
      ...ADD_PHOTO_ROUTE,
      index: this.props.route.index + 1,
    });
  };

  handleProfile = () => {
    this.drawerRef.closeDrawer();
    this.props.navigator.push({
      ...PROFILE_ROUTE,
      index: this.props.route.index + 1,
    });
  };

  handleLogout = () => {
    this.drawerRef.closeDrawer();
    this.props.onLogout();
  }

  render() {
    const { route, children } = this.props;
    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        renderNavigationView={this.getDrawer}
        ref={(drawer) => { this.drawerRef = drawer; }}>
        <View style={styles.drawerStyle}>
          <Toolbar
            title={route.title}
            icon={route.index > 0 ? 'keyboard-backspace' : 'menu'}
            onIconPress={
              route.index > 0 ? this.handleBackPress : this.handleToolbarPress
            } />
          {children}
        </View>
      </DrawerLayoutAndroid>
    );
  }
}

const styles = StyleSheet.create({
  headerText: {
    marginTop: 20,
  },
  drawerStyle: {
    flexDirection: 'column',
    paddingTop: 56,
    flex: 1,
  },
});
