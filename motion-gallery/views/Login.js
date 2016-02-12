view Login {
  const handleLogin = (type) => {
    if (view.props.onLogin) {
      view.props.onLogin(type);
    }
  };

  <flex>
    <button onClick={handleLogin.bind(null, 'google')}>
      Login with Google
    </button>
    <button onClick={handleLogin.bind(null, 'facebook')}>
      Login with Facebook
    </button>
    <button onClick={handleLogin.bind(null, 'github')}>
      Login with Github
    </button>
    <button onClick={handleLogin.bind(null, 'twitter')}>
      Login with Twitter
    </button>
  </flex>

  $flex = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  };

  $button = {
    flex: '0 0 auto',
  };
}
