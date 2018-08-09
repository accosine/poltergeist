import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import connectFirebase from '../util/connect-firebase';

const styleSheet = {
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
  avatar: {
    margin: 10,
  },
};

const Login = props => {
  const { classes, firebase: { isAuthenticated, authenticate }, user } = props;
  const authed = isAuthenticated();

  if (authed) {
    return (
      <div className={classes.row}>
        <Avatar alt="" src={user.avatar} className={classes.avatar} />
      </div>
    );
  } else {
    return <Button onClick={event => authenticate()}>Login</Button>;
  }
};

Login.defaultProps = {
  user: { avatar: '' },
};

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(connectFirebase(Login));
