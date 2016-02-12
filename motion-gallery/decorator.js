import Relay from 'react-relay'

window.Relay = Relay

window.relay = (name, obj) =>
  Motion.decorateView(name, View =>
    Relay.createContainer(View, { fragments: obj })
  )

export default {}