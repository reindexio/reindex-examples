import Relay from 'react-relay';

export default class ChangeTodoStatusMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation{ updateTodo }`;
  }

  getVariables() {
    return {
      id: this.props.id,
      complete: this.props.complete,
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on _TodoPayload {
        changedTodo {
          complete,
        },
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        changedTodo: this.props.id,
      },
    }];
  }

  getOptimisticResponse() {
    return {
      changedTodo: {
        id: this.props.id,
        complete: this.props.complete,
      },
    };
  }
}
