import Relay from 'react-relay'

Motion.decorateView('SinglePicture', (SinglePicture) =>
  Relay.createContainer(SinglePicture, {
    fragments: {
      picture: () => Relay.QL`
        fragment on Picture {
          ${Motion.getView('Picture').getFragment('picture')}
        }
      `,
      viewer: () => Relay.QL`
        fragment on ReindexViewer {
          ${Motion.getView('Picture').getFragment('viewer')}
        }
      `
    },
  })
)

view SinglePicture {
  prop picture
  prop viewer

  <Picture picture={picture} viewer={viewer} />

  $ = {
    margin: [0, 'auto'],
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 0',
    alignItems: 'center',
  }
}
