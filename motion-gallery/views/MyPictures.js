import UpdateUserInfoMutation from '../mutations/UpdateUserInfoMutation'

relay('MyPictures', {
  viewer: () => Relay.QL`
    fragment on ReindexViewer {
      user {
        id
        ${Motion.getView('PaginatedGallery').getFragment('user')}
        ${Motion.getView('Profile').getFragment('user')}
        ${UpdateUserInfoMutation.getFragment('user')}
      }
    }
  `,
})

view MyPictures {
  prop viewer

  on.mount(() => {
    if (!viewer.user.username || !viewer.user.avatarUrl) {
      Relay.Store.commitUpdate(new UpdateUserInfoMutation({
        user: viewer.user,
      }))
    }
  })

  <Profile user={viewer.user} />
  <PaginatedGallery user={viewer.user} />

  $ = {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    margin: [0, 'auto'],
    maxWidth: '650px',
  }

  $Profile = {
    flex: '0 0 auto',
    marginBottom: '5px',
  }

  $PaginatedGallery = {
    display: 'flex',
    flex: '1 1 0px',
  }
}
