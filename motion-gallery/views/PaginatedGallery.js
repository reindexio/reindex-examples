import Relay from 'react-relay';

Motion.decorateView('PaginatedGallery', (PaginatedGallery) =>
  Relay.createContainer(PaginatedGallery, {
    initialVariables: {
      showing: 9,
    },
    fragments: {
      user: () => Relay.QL`
        fragment on User {
          pictures(first: $showing) {
            count,
            ${Motion.getView('Gallery').getFragment('pictures')}
            pageInfo {
              hasNextPage
            }
          }
        }
      `,
    }
  })
)

view PaginatedGallery {
  prop user
  let loading = false

  loadMore = () => (
    view.props.relay.setVariables({
      showing: view.props.relay.variables.showing + 3,
    }, ({done}) => {
      loading = !done
    })
  )

  <Scrollable hasMore={user.pictures.pageInfo.hasNextPage}
              loading={loading}
              onScrollEnd={loadMore}>
    <Gallery pictures={user.pictures} />
  </Scrollable>

  $ = {
    display: 'flex',
    padding: 10
  }
}
