import moment from 'moment'

relay('Comment', {
  comment: () => Relay.QL`
    fragment on _PictureCommentEdge {
      node {
        text
        createdAt
        user {
          id
          username
          ${Motion.views.Avatar.getFragment('user')}
        }
      }
    }
  `,
})

view Comment {
  prop comment

  <Avatar user={comment.node.user} size={30} />
  <content>
    <top>
      <author>{comment.node.user.username}{' '}</author>
      <text>{comment.node.text}</text>
    </top>
    <when>{moment(comment.node.createdAt).fromNow()}</when>
  </content>


  $ = {
    display: 'flex',
  }

  $Avatar = {
    flex: '0 0 auto',
    marginRight: '5px',
  }

  $content = {
    flex: '1 1',
    display: 'flex',
    flexDirection: 'column',
  }

  $author = {
    fontWeight: 'bold',
    fontSize: '0.7em',
    display: 'inline',
  }

  $text = {
    fontSize: '0.7em',
    display: 'inline',
  }

  $when = {
    flex: '0 0 auto',
    fontSize: '0.6em',
    color: 'gray',
  }
}
