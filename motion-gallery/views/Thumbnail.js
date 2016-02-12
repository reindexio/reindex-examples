relay('Thumbnail', {
  picture: () => Relay.QL`
    fragment on _PictureEdge {
      node {
        id
        uploadCareId
      }
    }
  `,
})

view Thumbnail {
  prop picture

  <a onClick={Motion.router.link(`/picture/${picture.node.id}`)}>
    <img src={
      `https://ucarecdn.com/${picture.node.uploadCareId}/-/scale_crop/200x200/`
    } />
  </a>

  $ = {
    border: '1px #7f8c8d solid',
    marginBottom: 40
  }

  $img = {
    height: 'auto',
    width: '100%',
  }
}
