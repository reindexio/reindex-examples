import Relay from 'react-relay'

export default class UploadPictureMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation { createPicture }`
  }

  getVariables() {
    return {
      user: this.props.viewer.user.id,
      uploadCareId: this.props.uploadCareId,
      createdAt: '@TIMESTAMP',
    }
  }

  getFatQuery() {
    return Relay.QL`
      fragment on _PicturePayload {
        changedPictureEdge
        user {
          pictures {
            count
          }
        }
      }
    `
  }

  getConfigs() {
    return [
      {
        type: 'RANGE_ADD',
        parentID: this.props.viewer.user.id,
        connectionName: 'pictures',
        edgeName: 'changedPictureEdge',
        rangeBehaviors: {
          '': 'prepend',
        },
      },
      {
        type: 'RANGE_ADD',
        parentID: this.props.viewer.id,
        connectionName: 'allPictures',
        edgeName: 'changedPictureEdge',
        rangeBehaviors: {
          'orderBy(CREATED_AT_DESC)': 'prepend',
        },
      },
      {
        type: 'FIELDS_CHANGE',
        fieldIDs: {
          user: this.props.viewer.user.id,
        },
      },
    ]
  }
}

UploadPictureMutation.fragments = {
  viewer: () => Relay.QL`fragment on ReindexViewer {
    id
    user {
      id
      pictures {
        count
      }
    }
  }`
}
