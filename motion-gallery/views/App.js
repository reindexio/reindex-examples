view App {
  <NavBar onLogout={view.props.onLogout} />
  <content>
    <StreamRoute class="route" route="/" />
    <MyPicturesRoute class="route" route="/my" />
    <PictureRoute class="route" route="/picture/:id" />
    <UploadRoute class="route" route="/upload" />
  </content>
  <BottomBar />

  $ = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
    overflow: 'hidden',
    paddingBottom: '50px',
  }

  $NavBar = {
    flex: '0 0 auto',
    width: '100%',
  }

  $content = {
    flex: '1 0',
    display: 'flex',
    width: '100%',
    padding: [15, 0]
  }

  $route = {
    display: 'flex',
    flex: '1 1 0',
  }

  $BottomBar = {
    position: 'fixed',
    bottom: '0px',
  }
}
