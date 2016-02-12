import AddCommentMutation from '../mutations/AddCommentMutation'

relay('AddComment', {
  picture: () => Relay.QL`
   fragment on Picture {
     ${AddCommentMutation.getFragment('picture')}
   }
  `,
  viewer: () => Relay.QL`
    fragment on ReindexViewer {
      ${AddCommentMutation.getFragment('viewer')}
    }
  `
})

view AddComment {
  prop viewer
  prop picture

  let expanded = false
  let comment = ''

  const sendComment = () => {
    Relay.Store.commitUpdate(new AddCommentMutation({
      viewer: viewer,
      picture: picture,
      text: comment,
    }))
    comment = ''
    expanded = false
  }

  <button
    if={!expanded}
    onClick={() => expanded = true}>
    Add comment
  </button>
  <input
    if={expanded}
    type="text"
    value={comment}
    onChange={(e) => comment = e.target.value} />
  <button
    if={expanded}
    disabled={comment.length === 0}
    onClick={sendComment}>
    Send
  </button>

  $ = {
    display: 'flex'
  }

  $input = {
    flex: '1 1'
  }

  $button = {
    flex: '0 0 auto'
  }
}
