import React, {
  Component,
  StyleSheet,
  ScrollView,
  View,
  ListView,
  RefreshControl,
} from 'react-native';
import Relay from 'react-relay';

import { COLOR } from 'react-native-material-design';
import Spinner from 'react-native-spinkit';

import { PICTURE_ROUTE } from '../Routes';
import Picture from './Picture';

class Stream extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1.node.id !== row2.node.id
      }),
      isLoading: false,
      isRefreshing: false,
    };
  }

  componentDidMount() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(
        this.props.viewer.allPictures.edges
      ),
    });
  }

  handleEndReached = () => {
    if (!this.state.isLoading &&
        this.props.viewer.allPictures.pageInfo.hasNextPage) {
      this.setState({
        isLoading: true
      });
      this.props.relay.setVariables({
        showing: this.props.relay.variables.showing + 3
      }, (state) => {
        if (state.ready && state.done) {
          this.setState({
            isLoading: false,
            dataSource: this.state.dataSource.cloneWithRows(
              this.props.viewer.allPictures.edges
            ),
          });
        }
      });
    }
  }

  handleRefresh = () => {
    this.setState({
      isRefreshing: true
    });
    this.props.relay.forceFetch({}, (state) => {
      if (state.ready && state.done) {
        this.setState({
          isRefreshing: false,
          dataSource: this.state.dataSource.cloneWithRows(
            this.props.viewer.allPictures.edges
          ),
        });
      }
    });
  }

  renderRow = (edge) => (
    <Picture
      picture={edge.node}
      viewer={this.props.viewer}
      onShowComments={() => {
        this.props.navigator.push({
          ...PICTURE_ROUTE,
          index: this.props.route.index + 1,
          id: edge.node.id,
        })
      }} />
  );

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        onEndReached={this.handleEndReached}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this.handleRefresh}
            title="Loading..." />
        }
        renderFooter={() => (
          <View style={styles.footer}>
            {this.state.isLoading ?
              <Spinner
              type="ThreeBounce"
              color={COLOR.paperGrey200.color}
              size={64} /> :
              undefined }
          </View>
        )}/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    alignItems: 'center',
  },
});

export default Relay.createContainer(Stream, {
  initialVariables: {
    showing: 2,
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on ReindexViewer {
        allPictures(orderBy: CREATED_AT_DESC, first: $showing) {
          edges {
            node {
              id
              ${Picture.getFragment('picture')}
            }
          }
          pageInfo {
            hasNextPage
          }
        }
        ${Picture.getFragment('viewer')}
      }
    `,
  },
});
