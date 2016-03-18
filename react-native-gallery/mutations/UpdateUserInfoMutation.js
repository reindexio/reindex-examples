import Relay from 'react-relay'

export default class UpdateUserInfoMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation { updateUser }`
  }

  getVariables() {
    const credentials = normalizeCredentials(this.props.user)
    return {
      id: this.props.user.id,
      username: credentials.displayName,
      avatarUrl: credentials.picture,
    }
  }

  getFatQuery() {
    return Relay.QL`
      fragment on _UserPayload {
        changedUser {
          username
          avatarUrl
        }
      }
    `
  }

  getConfigs() {
    return [
      {
        type: 'FIELDS_CHANGE',
        fieldIDs: {
          changedUser: this.props.user.id,
        },
      },
    ]
  }

  getOptimisticResponse() {
    const credentials = normalizeCredentials(this.props.user)
    return {
      changedUser: {
        username: credentials.displayName,
        avatarUrl: credentials.picture,
      }
    }
  }
}

UpdateUserInfoMutation.fragments = {
  user: () => Relay.QL`
    fragment on User {
      id
      credentials {
        github {
          displayName
          picture
        }
        google {
          displayName
          picture(size: 73)
        }
        facebook {
          displayName
          picture(height: 73, width: 73)
        }
        twitter {
          displayName
          picture(size: bigger)
        }
      }
    }
  `
}

function normalizeCredentials(user) {
  for (const provider of ['github', 'google', 'facebook', 'twitter']) {
    if (user.credentials[provider]) {
      return user.credentials[provider]
    }
  }
}
