import Relay from 'react-relay'

import UpdateUserInfoMutation from '../mutations/UpdateUserInfoMutation'

Motion.decorateView('Stream', (Stream) =>
  Relay.createContainer(Stream, {
    initialVariables: {
      showing: 1,
    },
    fragments: {
      viewer: () => Relay.QL`
        fragment on ReindexViewer {
          allPictures(orderBy: CREATED_AT_DESC, first: $showing) {
            edges {
              node {
                ${Motion.getView('Picture').getFragment('picture')}
              }
            }
            pageInfo {
              hasNextPage
            }
          }
          user {
            ${UpdateUserInfoMutation.getFragment('user')}
          }
          ${Motion.getView('Picture').getFragment('viewer')}
        }
      `,
    },
  })
)

view Stream {
  prop viewer
  let loading = false

  on.mount(() => {
    if (!viewer.user.username || !viewer.user.avatarUrl) {
      Relay.Store.commitUpdate(new UpdateUserInfoMutation({
        user: viewer.user,
      }))
    }
  })

  const loadMore = () => {
    view.props.relay.setVariables({
      showing: view.props.relay.variables.showing + 1
    }, ({done}) => {
      loading = !done
    })
  }

  <Scrollable hasMore={viewer.allPictures.pageInfo.hasNextPage}
              loading={loading}
              onScrollEnd={loadMore}>
    <container>
      <Picture
        repeat={viewer.allPictures.edges}
        picture={_.node}
        viewer={viewer}
        redirectOnClick={true} />
    </container>
  </Scrollable>

  $ = {
    display: 'flex',
    justfiyContent: 'center',
    margin: [0, 'auto']
  }

  $container = {
    display: 'flex',
    margin: [0, 'auto'],
    maxWidth: 500,
    flexDirection: 'column',
  }

  $Picture = {
    paddingBottom: '10px',
    borderBottom: '1px solid #ddd',
  }
}
