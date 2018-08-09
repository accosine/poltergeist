import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

const styleSheet = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100vh',
  },
};

class MediaManager extends Component {
  state = {
    index: 0,
    selection: [],
    carouselSettings: {
      autoplay: false,
      loop: false,
      controls: true,
      delay: '3000',
    },
  };

  static defaultProps = {
    multiple: false,
  };

  static propTypes = {
    children: PropTypes.node.isRequired,
    onInsert: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    multiple: PropTypes.bool.isRequired,
  };

  static childContextTypes = {
    mediamanager: PropTypes.shape({
      multiple: PropTypes.bool.isRequired,
      onInsert: PropTypes.func.isRequired,
      onCancel: PropTypes.func.isRequired,
      onSelection: PropTypes.func.isRequired,
      onCarouselSettings: PropTypes.func.isRequired,
      handleTabChange: PropTypes.func.isRequired,
      index: PropTypes.number.isRequired,
      selection: PropTypes.array.isRequired,
      carouselSettings: PropTypes.shape({
        autoplay: PropTypes.bool.isRequired,
        loop: PropTypes.bool.isRequired,
        controls: PropTypes.bool.isRequired,
        delay: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  };

  onSelection = selection => {
    this.setState({ selection });
  };

  onCarouselSettings = carouselSettings => {
    this.setState({ carouselSettings });
  };

  handleTabChange = (event, index) => {
    this.setState({ index });
  };

  handleInsert = () => {
    const { multiple, onInsert } = this.props;
    const { selection, carouselSettings } = this.state;
    if (multiple) {
      onInsert(selection, carouselSettings);
    } else {
      onInsert(selection[0]);
    }
  };

  getChildContext() {
    const { multiple, onCancel } = this.props;
    return {
      mediamanager: {
        multiple,
        onCancel,
        onInsert: this.handleInsert,
        onSelection: this.onSelection,
        onCarouselSettings: this.onCarouselSettings,
        handleTabChange: this.handleTabChange,
        ...this.state,
      },
    };
  }

  render() {
    return (
      <div className={this.props.classes.container}>{this.props.children}</div>
    );
  }
}

export default withStyles(styleSheet)(MediaManager);
