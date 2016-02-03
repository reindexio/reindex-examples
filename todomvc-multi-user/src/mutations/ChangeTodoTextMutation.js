import Relay from 'react-relay';

export default class ChangeTodoTextMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation{ updateTodo }`;
  }

  getVariables() {
    return {
      id: this.props.id,
      text: this.props.text,
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on _TodoPayload {
        changedTodo {
          text,
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
        text: this.props.text,
      },
    };
  }
}
