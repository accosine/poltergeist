import React, { Component } from 'react';
import PropTypes from 'prop-types';

const withTheme = ComponentToWrap => {
  class C extends Component {
    static contextTypes = {
      theme: PropTypes.object.isRequired,
    };
    render() {
      const { theme } = this.context;
      const { context, ...props } = this.props;
      return (
        <ComponentToWrap
          {...props}
          styleProps={{ theme, ...context, ...this.props.styleProps }}
        />
      );
    }
  }
  C.displayName = `withTheme(${ComponentToWrap.displayName ||
    ComponentToWrap.name})`;
  return C;
};
export default withTheme;
