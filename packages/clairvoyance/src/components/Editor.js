import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

const styleSheet = {
  textArea: {
    display: 'block',
    width: '100%',
    height: '100%',
    border: 0,
    outline: 'none',
    fontSize: '12pt',
    background: 'transparent',
    resize: 'none',
    padding: 10,
  },
};

class Editor extends Component {
  handleEdit = ({ target }) => {
    const text = target.value;
    this.props.onEdit(text, {
      start: target.selectionStart,
      end: target.selectionEnd,
    });
  };

  handleCaretPosition = ({ target }) => {
    this.props.onCaretPosition({
      start: target.selectionStart,
      end: target.selectionEnd,
    });
  };

  render() {
    const { classes, text } = this.props;

    return (
      <textarea
        autoFocus
        value={text}
        className={classes.textArea}
        onChange={this.handleEdit}
        onClick={this.handleCaretPosition}
        onKeyUp={this.handleCaretPosition}
      />
    );
  }
}

export default withStyles(styleSheet)(Editor);
