relay('Gallery', {
  pictures: () => Relay.QL`
    fragment on _PictureConnection {
      edges {
        ${Motion.getView('Thumbnail').getFragment('picture')}
      }
    }
  `,
})

view Gallery {
  prop pictures

  const needExtra = () => pictures.edges.length % 3

  <Thumbnail repeat={pictures.edges} picture={_} />
  <filler if={needExtra() > 0} />
  <filler if={needExtra() > 1} />

  $ = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    flexWrap: 'wrap',
  }

  $Thumbnail = {
    flex: '0 0 auto',
    maxWidth: '33%',
    height: 'auto',
  }

  $filler = {
    flex: '0 0 auto',
    width: '33%',
    height: 'auto',
  }
}
