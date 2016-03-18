import Relay from 'react-relay'

export default class AddCommentMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation { createPictureComment }`
  }

  getVariables() {
    return {
      user: this.props.viewer.user.id,
      picture: this.props.picture.id,
      text: this.props.text,
      createdAt: '@TIMESTAMP',
    }
  }

  getFatQuery() {
    return Relay.QL`
      fragment on _PictureCommentPayload {
        changedPictureCommentEdge
        picture {
          comments {
            count
          }
        }
      }
    `
  }

  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentID: this.props.picture.id,
      connectionName: 'comments',
      edgeName: 'changedPictureCommentEdge',
      rangeBehaviors: {
        '': 'append',
      },
    }, {
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        picture: this.props.picture.id,
      },
    }]
  }

  getOptimisticResponse() {
    return {
      changedPictureCommentEdge: {
        node: {
          text: this.props.text,
          createdAt: (new Date()).toISOString(),
          user: {
            id: this.props.viewer.user.id,
            username: this.props.viewer.user.username,
            avatarUrl: this.props.viewer.user.avatarUrl,
          },
        },
      },
      picture: {
        comments: {
          count: this.props.picture.comments.count + 1,
        },
      },
    }
  }
}

AddCommentMutation.fragments = {
  picture: () => Relay.QL`fragment on Picture {
    id
    comments {
      count
    }
  }`,
  viewer: () => Relay.QL`fragment on ReindexViewer {
    user {
      id
      username
      avatarUrl
    }
  }`,
}
