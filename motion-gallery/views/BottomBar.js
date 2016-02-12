view BottomBar {
  <stream tagName="button" onClick={Motion.router.link('/')}>Stream</stream>
  <upload tagName="button" onClick={Motion.router.link('/upload')}>
    <Icon.Camera />
  </upload>
  <mypictures tagName="button" onClick={Motion.router.link('/my')}>
    My pictures
  </mypictures>

  $ = {
    display: 'flex',
    backgroundColor: '#fff',
    height: '50px',
    padding: '0 10px',
    width: '100%',
    justifyContent: 'space-around',
    boxShadow: '0 0 5px  rgba(0,0,0,0.2)',
  }

  const shared = {
    background: "none",
    border: "none",
    color: "#d57d2c",
    fontSize: 16,
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    cursor: 'pointer',
    outline: 'none',
    textAlign: 'center',

    hover: {
      background: 'rgba(0,0,0,0.1)'
    }
  }

  $stream = [shared, {
    background: Motion.router.isActive('/') ? 'rgba(0,0,0,0.1)' : 'none',
  }]

  $upload = [shared, {
    background: Motion.router.isActive('/updoad') ? 'rgba(0,0,0,0.1)' : 'none',
  }]

  $mypictures = [shared, {
    background: Motion.router.isActive('/my') ? 'rgba(0,0,0,0.1)' : 'none',
  }]
}

view Icon.Camera {
  <svg version="1.1" id="Capa_1" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 533.333 533.333" style="enable-background:new 0 0 533.333 533.333;">
  <g>
    <path d="M158.333,300c0,59.831,48.502,108.333,108.333,108.333S375,359.831,375,300s-48.502-108.333-108.333-108.333   S158.333,240.169,158.333,300z M500,116.667H383.333C375,83.333,366.667,50,333.333,50H200c-33.333,0-41.667,33.333-50,66.667   H33.333C15,116.667,0,131.667,0,150v300c0,18.333,15,33.333,33.333,33.333H500c18.333,0,33.334-15,33.334-33.333V150   C533.333,131.667,518.333,116.667,500,116.667z M266.667,447.917c-81.692,0-147.917-66.224-147.917-147.917   c0-81.692,66.224-147.917,147.917-147.917c81.693,0,147.917,66.224,147.917,147.917   C414.583,381.693,348.361,447.917,266.667,447.917z M500,216.667h-66.666v-33.333H500V216.667z" fill="#000000"/>
  </g>
  </svg>
}
