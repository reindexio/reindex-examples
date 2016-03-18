import React, {
  Component,
  StyleSheet,
  ScrollView,
  Dimensions,
  View,
  ListView,
  RefreshControl,
} from 'react-native';
import Relay from 'react-relay';

import { COLOR } from 'react-native-material-design';
import Spinner from 'react-native-spinkit';

import Thumbnail from './Thumbnail';

class PaginatedGallery extends Component {
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
        this.props.user.pictures.edges
      ),
    });
  }

  handleEndReached = () => {
    if (!this.state.isLoading &&
        this.props.user.pictures.pageInfo.hasNextPage) {
      this.setState({
        isLoading: true
      });
      this.props.relay.setVariables({
        showing: this.props.relay.variables.showing + 1
      }, (state) => {
        if (state.ready && state.done) {
          this.setState({
            isLoading: false,
            dataSource: this.state.dataSource.cloneWithRows(
              this.props.user.pictures.edges
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
            this.props.user.pictures.edges
          ),
        });
      }
    });
  }

  renderRow = (edge) => (
    <Thumbnail
      picture={edge.node}
      onPress={() => this.props.onPress(edge.node.id)}
      style={styles.thumbnail} />
  );

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        onEndReached={this.handleEndReached}
        pageSize={2}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this.handleRefresh}
            title="Loading..." />
        }
        contentContainerStyle={styles.container}
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
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 4,
  },
  thumbnail: {
    width: Dimensions.get('window').width / 2 - 4 - 2,
    height: Dimensions.get('window').width / 2 - 4 - 2,
    marginBottom: 4,
  },
});

export default Relay.createContainer(PaginatedGallery, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        pictures(first: $showing) {
          count,
          edges {
            node {
              id
              ${Thumbnail.getFragment('picture')}
            }
          }
          pageInfo {
            hasNextPage
          }
        }
      }
    `,
  },
  initialVariables: {
    showing: 1,
  },
  prepareVariables: (prevVariables) => {
    const fitsPage = Math.ceil(
      Dimensions.get('window').height /
      (Dimensions.get('window').width / 2)
    );
    return {
      ...prevVariables,
      showing: prevVariables.showing * fitsPage + 2,
    };
  },
});
