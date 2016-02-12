import Relay from 'react-relay'

Motion.decorateView('Picture', (Picture) =>
  Relay.createContainer(Picture, {
    fragments: {
      picture: () => Relay.QL`
        fragment on Picture {
          id
          uploadCareId
          ${Motion.getView('PictureHeader').getFragment('picture')}
          ${Motion.getView('PictureComments').getFragment('picture')}
          ${Motion.getView('AddComment').getFragment('picture')}
        }
      `,
      viewer: () => Relay.QL`
        fragment on ReindexViewer {
          ${Motion.getView('AddComment').getFragment('viewer')}
        }
      `
    },
  })
)

view Picture {
  prop picture
  prop viewer
  prop redirectOnClick = false

  const handleClick = () => {
    if (redirectOnClick) {
      Motion.router.go(`/picture/${picture.id}`)
    }
  }

  <PictureHeader picture={picture} onClick={handleClick} />
  <imgWrapper onClick={handleClick}>
    <img src={
      `https://ucarecdn.com/${picture.uploadCareId}/-/scale_crop/600x600/`
    } />
  </imgWrapper>
  <PictureComments picture={picture} />
  <AddComment picture={picture} viewer={viewer} />

  $ = {
    display: 'flex',
    flexDirection: 'column',
    flex: '0 0 auto'
  }

  $PictureHeader = {
    flex: '0 0 auto',
  }

  $imgWrapper = {
    flex: '0 0 auto',
    width: '100%',
    height: '100%',
  }

  $img = {
    width: '100%',
    height: 'auto',
  }

  $PictureComments = {
    flex: '1 1',
  }
}
