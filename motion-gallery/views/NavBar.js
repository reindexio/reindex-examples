view NavBar {
  const handleLogout = () => {
    if (view.props.onLogout) {
      view.props.onLogout()
    }
  }

  <header onClick={Motion.router.link('/')}>
    Motion + Reindex Instagram
  </header>

  $ = {
    backgroundColor: '#fff',
    height: '50px',
  }

  $header = {
    lineHeight: '50px',
    color: '#d57d2c',
    boxShadow: '0 0 5px  rgba(0,0,0,0.2)',
    fontSize: '16px',
    textAlign: "center",
    zIndex: 1000,
    position: 'relative'
  }
}
