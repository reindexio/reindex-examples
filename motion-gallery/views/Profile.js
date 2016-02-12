relay('Profile', {
  user: () => Relay.QL`
    fragment on User {
      username
      ${Motion.views.Avatar.getFragment('user')}
    }
  `,
})

view Profile {
  prop user

  <Avatar user={user} size={72} />
  <nick>{user.username}</nick>

  $ = {
    display: 'flex',
    padding: 20,
  }

  $Avatar = {
    marginRight: '20px',
  }

  $nick = {
    fontWeight: 'bold',
  }
}
