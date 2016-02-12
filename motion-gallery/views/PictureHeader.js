import Relay from 'react-relay'
import moment from 'moment'

Motion.decorateView('PictureHeader', (PictureHeader) =>
  Relay.createContainer(PictureHeader, {
    fragments: {
      picture: () => Relay.QL`
        fragment on Picture {
          id
          createdAt
          user {
            id
            username
            ${Motion.getView('Avatar').getFragment('user')}
          }
        }
      `,
    },
  })
)

view PictureHeader {
  prop picture

  <Avatar user={picture.user} />
  <nick>{picture.user.username}</nick>
  <when>{moment(picture.createdAt).fromNow()}</when>

  $ = {
    display: 'flex',
    alignItems: 'center',
    padding: '5px',
  }

  $Avatar = {
    flex: '0 0 auto',
    marginRight: '5px',
  }

  $nick = {
    flex: '1 1',
    padding: 10,
    fontWeight: 'bold',
  }

  $when = {
    flex: '0 0 auto',
    fontSize: '0.8em',
  }
}
