import Relay from 'react-relay'

Motion.decorateView('PictureComments', (PictureComments) =>
  Relay.createContainer(PictureComments, {
    fragments: {
      picture: () => Relay.QL`
        fragment on Picture {
          id
          comments(first: 100000) {
            edges {
              ${Motion.getView('Comment').getFragment('comment')}
            }
          }
        }
      `,
    },
  })
)


view PictureComments {
  prop picture

  <Comment repeat={picture.comments.edges} comment={_} />

  $ = {
    padding: '5px',
  }

  $Comment = {
    marginBottom: '10px',
  }
}
