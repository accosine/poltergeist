import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from 'material-ui/styles';
import BottomNavigation, {
  BottomNavigationAction,
} from 'material-ui/BottomNavigation';

import './devices.min.css';

const styles = {
  root: {
    width: 500,
    position: 'relative',
    alignSelf: 'center',
    zIndex: 1,
  },
  devices: {
    display: 'flex',
    flexDirection: 'row',
    transform: 'scale(0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

const Iphone6 = withStyles({
  screen: {
    zIndex: 3,
  },
  homebutton: {
    cursor: 'pointer',
  },
})(({ children, onHome, classes }) => (
  <div className="marvel-device iphone6plus silver">
    <div className="top-bar" />
    <div className="sleep" />
    <div className="volume" />
    <div className="camera" />
    <div className="sensor" />
    <div className="speaker" />
    <div className={classnames(classes.screen, 'screen')}>{children}</div>
    <div onClick={onHome} className={classnames('home', classes.homebutton)} />
    <div className="bottom-bar" />
  </div>
));

class DevicePreview extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes, children, onClose } = this.props;
    const { value } = this.state;

    return (
      <Fragment>
        <div className={classes.root}>
          <BottomNavigation
            value={value}
            onChange={this.handleChange}
            showLabels
          >
            <BottomNavigationAction label="Desktop" />
            <BottomNavigationAction label="iPhone 6" />
          </BottomNavigation>
        </div>
        {value === 0 ? children : null}
        <div className={classes.devices}>
          {value === 1 ? <Iphone6 onHome={onClose}>{children}</Iphone6> : null}
        </div>
      </Fragment>
    );
  }
}

DevicePreview.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DevicePreview);
