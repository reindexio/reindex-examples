import React, {Component} from 'react';
import Relay from 'react-relay';
import classNames from 'classnames';

import AddTodoMutation from '../mutations/AddTodoMutation';
import DeleteTodoMutation from '../mutations/DeleteTodoMutation';

import TodoList from './TodoList';
import TodoInput from './TodoInput';

import 'todomvc-app-css/index.css';

class TodoApp extends Component {
  state = {
    selectedFilter: 'all',
  };

  handleLogout = (e) => {
    e.preventDefault();
    if (this.props.onLogout) {
      this.props.onLogout();
    }
  }

  handleFilterChange = (filter) => {
    this.setState({
      selectedFilter: filter,
    });
  }

  handleInputSave = (text) => {
    Relay.Store.update(
      new AddTodoMutation({
        text,
        user: this.props.viewer.user,
      }),
    );
  }

  handleClearCompleted = () => {
    this.props.viewer.user.todos.edges
      .filter((edge) => edge.node.complete)
      .forEach((edge) => Relay.Store.update(
        new DeleteTodoMutation({
          id: edge.node.id,
          user: this.props.viewer.user,
        })
      ));
  };

  makeHeader() {
    return (
      <header className="header">
        <h1>Todos</h1>
        <TodoInput className="new-todo"
                   placeholder="What needs to be done?"
                   onSave={this.handleInputSave} />
      </header>
    );
  }

  makeFooter() {
    const total = this.props.viewer.user.todos.count;
    const undone = this.props.viewer.user.todos.edges.reduce((next, edge) => (
      next + (edge.node.complete ? 0 : 1)
    ), 0);

    const filters = ['all', 'active', 'completed'].map((filter) => {
      const selected = filter === this.state.selectedFilter;
      return (
        <li key={filter}>
          <a href={'#' + filter}
             className={classNames({ selected })}
             onClick={selected ? null : this.handleFilterChange.bind(
               this, filter
             )}>
             {filter}
          </a>
        </li>
      );
    })

    let clearButton;
    if (this.props.viewer.user.todos.edges.some((edge) => edge.node.complete)) {
      clearButton = (
        <button className="clear-completed"
                onClick={this.handleClearCompleted}>
          Clear completed
        </button>
      );
    }

    return (
      <footer className="footer">
        <span className="todo-count">
          {undone} / {total} items left
        </span>
        <ul className="filters">
          {filters}
        </ul>
        {clearButton}
      </footer>
    );
  }

  render() {
    return (
      <div>
        <section className="todoapp">
          {this.makeHeader()}
         <TodoList todos={this.props.viewer.user.todos}
                   filter={this.state.selectedFilter}
                   user={this.props.viewer.user} />
          {this.makeFooter()}
        </section>
        <a href="#"
           className="logout"
           onClick={this.handleLogout}>
          Logout
        </a>
      </div>
    );
  }
}

export default Relay.createContainer(TodoApp, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on ReindexViewer {
        user {
          id,
          todos(first: 1000000) {
            count,
            edges {
              node {
                id,
                complete
              }
            }
            ${TodoList.getFragment('todos')}
          },
          ${TodoList.getFragment('user')}
          ${AddTodoMutation.getFragment('user')}
          ${DeleteTodoMutation.getFragment('user')}
        }
      }
    `,
  },
});
