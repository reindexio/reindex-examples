relay('Avatar', {
  user: () => Relay.QL`
    fragment on User {
      id
      username
      avatarUrl
    }
  `
})

view Avatar {
  prop user
  prop size = 30

  <img src={user.avatarUrl} alt={user.username} />

  $ = {
    height: `${size}px`,
    width: `${size}px`,
    marginRight: 5
  }

  $img = {
    display: 'block',
    height: `${size}px`,
    width: `${size}px`,
    borderRadius: `${size}px`,
    border: '1px solid #eee',
  }
}
