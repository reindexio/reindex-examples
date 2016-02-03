import Relay from 'react-relay';

export default class AddTodoMutation extends Relay.Mutation {
  static fragments = {
    user: () => Relay.QL`fragment on User {
      id
      todos {
        count,
      }
    }`
  };

  getMutation() {
    return Relay.QL`mutation{ createTodo }`;
  }

  getVariables() {
    return {
      text: this.props.text,
      complete: false,
      user: this.props.user.id,
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on _TodoPayload {
        changedTodoEdge,
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
      type: 'RANGE_ADD',
      parentID: this.props.user.id,
      connectionName: 'todos',
      edgeName: 'changedTodoEdge',
      rangeBehaviors: {
        '': 'prepend',
      },
    }, {
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        user: this.props.user.id,
      },
    }];
  }

  getOptimisticResponse() {
    return {
      changedTodoEdge: {
        node: {
          text: this.props.text,
          complete: false,
        },
      },
      user: {
        id: this.props.user.id,
        todos: {
          count: this.props.user.todos.count + 1,
        },
      },
    };
  }
}
