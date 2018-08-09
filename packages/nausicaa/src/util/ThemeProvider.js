import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';

class ThemeProvider extends Component {
  static propTypes = {
    theme: PropTypes.object.isRequired,
  };
  // you must specify what you’re adding to the context
  static childContextTypes = {
    theme: PropTypes.object.isRequired,
  };
  getChildContext() {
    const { theme } = this.props;
    return { theme };
  }
  render() {
    // `Children.only` enables us not to add a <div /> for nothing
    return Children.only(this.props.children);
  }
}
export default ThemeProvider;
