import './decorator'
import 'babel-polyfill';
import Relay from 'react-relay';
import Reindex from 'reindex-js';

import Config from './Config';

const reindex = new Reindex(Config.REINDEX_URL);
Relay.injectNetworkLayer(reindex.getRelayNetworkLayer());

view Main {
  let isLoggedIn = reindex.isLoggedIn();

  const handleTokenChange = () => {
    window.location.reload();
  };

  const handleLogin = (type) => {
    reindex.login(type).catch((error) => {
      alert(error.message);
    });
  };

  const handleLogout = () => {
    reindex.logout();
  };

  on.mount(() => {
    reindex.addListener('tokenChange', handleTokenChange);
  });

  on.unmount(() => {
    reindex.removeListener('tokenChange', handleTokenChange);
  });

  <App onLogout={handleLogout} if={isLoggedIn} />
  <Login onLogin={handleLogin} if={!isLoggedIn} />
}
