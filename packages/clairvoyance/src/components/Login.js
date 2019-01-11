import React from 'react';
import { makeStyles } from '@material-ui/styles';
import classnames from 'classnames';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useFirebaseContext } from '../firebase';

const useStyles = makeStyles({
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
  avatar: {
    margin: 10,
    cursor: 'pointer',
  },
  invisible: {
    display: 'hidden',
  },
});

const Login = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [avatarError, setAvatarError] = React.useState(false);
  const {
    user,
    signIn,
    signOut,
    loading,
  } = useFirebaseContext().authentication;

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return loading ? (
    <CircularProgress color="secondary" />
  ) : user ? (
    <div className={classes.row}>
      {avatarError ? (
        <Avatar onClick={handleClick} className={classes.avatar}>
          {user.displayName
            .split(' ')
            .map(x => x[0])
            .join('')}
        </Avatar>
      ) : (
        <Avatar
          onClick={handleClick}
          alt="user avatar"
          src={user.photoURL}
          imgProps={{
            onError: () => setAvatarError(true),
          }}
          className={classnames(classes.avatar, {
            [classes.invisible]: avatarError,
          })}
        />
      )}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            signOut();
            handleClose();
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </div>
  ) : (
    <Button onClick={signIn}>Login</Button>
  );
};

export default Login;
