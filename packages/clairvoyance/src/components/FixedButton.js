import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';

const styleSheet = theme => ({
  button: {
    bottom: 0,
    margin: 3 * theme.spacing.unit,
    position: 'fixed',
    zIndex: 1300,
  },
  center: {
    left: '50%',
    transform: 'translateX(-50%)',
  },
  left: { left: 0 },
  right: { right: 0 },
});

const FixedButton = ({ children, classes, position, top, ...props }) => (
  <Fab className={classNames(classes.button, classes[position])} {...props}>
    {children}
  </Fab>
);

FixedButton.propTypes = {
  children: PropTypes.node.isRequired,
  position: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};
FixedButton.defaultProps = {
  position: 'center',
};

export default withStyles(styleSheet)(FixedButton);
