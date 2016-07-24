import Relay from 'react-relay';

export default class AddTodoMutation extends Relay.Mutation {

  getMutation() {
    return Relay.QL`mutation{ createTodo }`;
  }

  getVariables() {
    return {
      text: this.props.text,
      complete: false,
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on _TodoPayload {
        changedTodoEdge,
        viewer {
          id,
          allTodos {
            count
          }
        }
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentID: this.props.viewer.id,
      connectionName: 'allTodos',
      edgeName: 'changedTodoEdge',
      rangeBehaviors: {
        '': 'prepend',
      },
    }, {
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        viewer: this.props.viewer.id,
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
      viewer: {
        id: this.props.viewer.id,
        allTodos: {
          count: this.props.viewer.allTodos.count + 1,
        },
      },
    };
  }
}
