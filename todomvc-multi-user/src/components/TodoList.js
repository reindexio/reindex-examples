import React, {Component} from 'react';
import Relay from 'react-relay';

import ChangeTodoStatusMutation from '../mutations/ChangeTodoCompleteMutation';

import Todo from './Todo';

class TodoList extends Component {
  getFilteredTodos() {
    const edges = this.props.todos.edges;
    if (this.props.filter === 'active') {
      return edges.filter((todo) => !todo.node.complete);
    } else if (this.props.filter === 'completed') {
      return edges.filter((todo) => todo.node.complete);
    } else {
      return edges;
    }
  }

  handleToggleAllChange = () => {
    const todoCount = this.props.todos.count;
    const done = this.props.todos.edges.reduce((next, edge) => (
      next + (edge.node.complete ? 1 : 0)
    ), 0);
    let setTo = true;
    if (todoCount === done) {
      setTo = false;
    }

    this.props.todos.edges
      .filter((edge) => edge.node.complete !== setTo)
      .forEach((edge) => Relay.Store.update(
        new ChangeTodoStatusMutation({
          id: edge.node.id,
          complete: setTo,
        })
      ));
  }

  makeTodo = (edge) => {
    return (
      <Todo key={edge.node.id}
            todo={edge.node}
            user={this.props.user} />
    );
  }

  render() {
    const todoCount = this.props.todos.count;
    const done = this.props.todos.edges.reduce((next, edge) => (
      next + (edge.node.complete ? 1 : 0)
    ), 0);
    const todos = this.getFilteredTodos();
    const todoList = todos.map(this.makeTodo);
    return (
      <section className="main">
        <input className="toggle-all"
               checked={todoCount === done}
               onChange={this.handleToggleAllChange}
               type="checkbox" />
        <ul className="todo-list">
          {todoList}
        </ul>
      </section>
    );
  }
}

export default Relay.createContainer(TodoList, {
  fragments: {
    todos: () => Relay.QL`
      fragment on _TodoConnection {
        count,
        edges {
          node {
            id,
            complete,
            ${Todo.getFragment('todo')}
          }
        }
      }
    `,
    user: () => Relay.QL`
      fragment on User {
        ${Todo.getFragment('user')}
      }
    `,
  },
});
