import keycodes from 'keycodes';
import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';

export default class TodoInput extends Component {
  state = {
    text: this.props.initialValue || '',
  };

  handleBlur = () => {
    if (this.props.saveOnBlur) {
      this.save();
    }
  }

  handleChange = (e) => {
    this.setState({
      text: e.target.value,
    });
  }

  handleKeyDown = (e) => {
    if (e.keyCode === keycodes('esc')) {
      if (this.props.onCancel) {
        this.props.onCancel();
      }
    } else if (e.keyCode === keycodes('enter')) {
      this.save();
    }
  }

  save() {
    const text = this.state.text.trim();
    if (text === '') {
      if (this.props.onDelete) {
        this.props.onDelete();
      }
    } else if (text === this.props.initialValue) {
      if (this.props.onCancel) {
        this.props.onCancel();
      }
    } else {
      if (this.props.onSave) {
        this.props.onSave(text);
      }
      this.setState({
        text: '',
      });
    }
  }

  componentDidMount() {
    findDOMNode(this).focus();
  }

  render() {
    return (
      <input className={this.props.className || ''}
             placeholder={this.props.placeholder || ''}
             value={this.state.text}
             onBlur={this.handleBlur}
             onChange={this.handleChange}
             onKeyDown={this.handleKeyDown} />
    );
  }
}
