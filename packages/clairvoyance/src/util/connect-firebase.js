import React, { Component } from 'react';
import PropTypes from 'prop-types';

const connectFirebase = ComponentToWrap => {
  class C extends Component {
    static contextTypes = {
      firebase: PropTypes.object.isRequired,
    };
    render() {
      const { firebase } = this.context;
      return <ComponentToWrap {...this.props} firebase={firebase} />;
    }
  }
  C.displayName = `connectFirebase(${ComponentToWrap.displayName ||
    ComponentToWrap.name})`;
  return C;
};
export default connectFirebase;
