import React, {
  Component,
  AsyncStorage,
  Platform,
  Text,
  View,
  Navigator,
} from 'react-native';
import Relay from 'react-relay';
import Reindex from 'reindex-js';
import { fromCallback } from 'bluebird';

import Auth0Lock from 'react-native-lock';
import Spinner from 'react-native-loading-spinner-overlay';

import Config from './config';
import { STREAM_ROUTE } from './Routes';
import SceneWrapper from './routes/SceneWrapper';
import AddPictureRoute from './routes/AddPictureRoute';
import PictureRoute from './routes/PictureRoute';
import StreamRoute from './routes/StreamRoute';
import MyPicturesRoute from './routes/MyPicturesRoute';

const reindex = new Reindex(Config.REINDEX_URL);
Relay.injectNetworkLayer(reindex.getRelayNetworkLayer());

export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this._checkLogin();
  }

  componentDidUpdate() {
    this._checkLogin();
  }

  getScene(route, navigator) {
    if (route.name === 'AddPicture') {
      return <AddPictureRoute route={route} navigator={navigator} />;
    } else if (route.name === 'Picture') {
      return <PictureRoute route={route} navigator={navigator} />;
    } else if (route.name === 'Stream') {
      return <StreamRoute route={route} navigator={navigator} />;
    } else if (route.name === 'Profile') {
      return <MyPicturesRoute route={route} navigator={navigator} />;
    } else {
      return <Text>{route.title}</Text>;
    }
  }

  async handleLogout() {
    await reindex.logout();
    await AsyncStorage.removeItem('REINDEX_TOKEN');
    return this._checkLogin();
  }

  async _checkLogin() {
    if (!reindex.isLoggedIn()) {
      const reindexToken = await AsyncStorage.getItem('REINDEX_TOKEN');
      console.log(reindexToken);
      if (reindexToken) {
        reindex.setToken(reindexToken);
      } else {
        try {
          // Login to Auth0
          const lock = new Auth0Lock({
            clientId: Config.AUTH0_CLIENTID,
            domain: Config.AUTH0_DOMAIN,
          });
          const auth0Result = await fromCallback(
            (callback) => lock.show({}, callback),
            { multiArgs: true },
          );
          const auth0Token = auth0Result[1];

          // Login to Reindex
          const reindexResponse = await reindex.loginWithToken(
            'auth0',
            auth0Token.idToken
          );
          await AsyncStorage.setItem('REINDEX_TOKEN', reindexResponse.token);

          // Get Auth0 profile
          const profileResponse = await fetch(
            `https://${Config.AUTH0_DOMAIN}/userinfo`,
            {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${auth0Token.accessToken}`,
              },
            }
          );
          const profile = await profileResponse.json();

          // Update Reindex user
          const updateResult = await reindex.query(`
            mutation($input: _UpdateUserInput!) {
              updateUser(input: $input) {
                id
              }
            }
          `, {
            input: {
              id: reindexResponse.user.id,
              username: profile.nickname,
              avatarUrl: profile.picture,
            },
          });

          for (const error of updateResult.errors || []) {
            console.error(error);
          }
        } catch (e) {
          console.error(e);
        }
      }

      if (reindex.isLoggedIn()) {
        this.setState({
          loading: false,
        });
      } else {
        return this._checkLogin();
      }
    }
    return true;
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1 }}>
          <Spinner visible />
        </View>
      );
    } else {
      return (
        <Navigator
          initialRoute={{
            ...STREAM_ROUTE,
            index: 0,
          }}
          renderScene={(route, navigator) =>
            <SceneWrapper
              route={route}
              navigator={navigator}
              onLogout={() => this.handleLogout()}>
              {this.getScene(route, navigator)}
            </SceneWrapper>
          } />
      );
    }
  }
}
