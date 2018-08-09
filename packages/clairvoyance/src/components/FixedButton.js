import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

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
  <Button
    variant="fab"
    className={classNames(classes.button, classes[position])}
    {...props}
  >
    {children}
  </Button>
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
