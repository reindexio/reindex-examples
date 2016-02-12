import { throttle } from 'lodash'

view Scrollable {
  prop loading = false
  prop hasMore = true
  prop onScrollEnd = () => null

  let handleScroll = () => {
    if (!loading && hasMore) {
      const el = view.refs.scrollable
      if (el.scrollTop === (el.scrollHeight - el.clientHeight)) {
        onScrollEnd()
      }
    }
  }

  on.mount(handleScroll)
  on.scroll(view.refs.scrollable, throttle(handleScroll, 200))

  <scrollable ref='scrollable'>
    {view.props.children}
    <loading if={loading}>Loading...</loading>
  </scrollable>

  $ = {
    overflowY: 'scroll',
    flexGrow: 1
  }

  $loading = {
    flex: '0 0 auto',
    height: '50px',
  }
}
