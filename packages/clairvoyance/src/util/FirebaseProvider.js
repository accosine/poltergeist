import { Component, Children } from 'react';
import PropTypes from 'prop-types';

class FirebaseProvider extends Component {
  static propTypes = {
    firebase: PropTypes.object.isRequired,
  };

  static childContextTypes = {
    firebase: PropTypes.object.isRequired,
  };

  getChildContext() {
    const { firebase } = this.props;
    return { firebase };
  }

  render() {
    return Children.only(this.props.children);
  }
}
export default FirebaseProvider;
