import Relay from 'react-relay';

export default class DeleteTodoMutation extends Relay.Mutation {
  static fragments = {
    user: () => Relay.QL`fragment on User {
      id
      todos(first: 1000000) {
        count,
      }
    }`
  };

  getMutation() {
    return Relay.QL`mutation{ deleteTodo }`;
  }

  getVariables() {
    return {
      id: this.props.id,
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on _TodoPayload {
        id,
        user {
          id,
          todos {
            count
          }
        }
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'NODE_DELETE',
      parentName: 'user',
      parentID: this.props.user.id,
      connectionName: 'todos',
      deletedIDFieldName: 'id',
    }, {
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        user: this.props.user.id,
      },
    }];
  }

  getOptimisticResponse() {
    return {
      id: this.props.id,
      user: {
        id: this.props.user.id,
        todos: {
          count: this.props.user.todos.count - 1,
        },
      },
    };
  }
}
