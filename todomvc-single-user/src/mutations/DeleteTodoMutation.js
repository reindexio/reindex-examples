import Relay from 'react-relay';

export default class DeleteTodoMutation extends Relay.Mutation {
  static fragments = {
    viewer: () => Relay.QL`fragment on ReindexViewer {
      id
      allTodos(first: 1000000) {
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
        viewer {
          id,
          allTodos {
            count,
          }
        }
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'NODE_DELETE',
      parentName: 'viewer',
      parentID: this.props.viewer.id,
      connectionName: 'allTodos',
      deletedIDFieldName: 'id',
    }, {
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        viewer: this.props.viewer.id,
      },
    }];
  }

  getOptimisticResponse() {
    return {
      id: this.props.id,
      viewer: {
        id: this.props.viewer.id,
        allTodos: {
          count: this.props.viewer.allTodos.count - 1,
        },
      },
    };
  }
}
