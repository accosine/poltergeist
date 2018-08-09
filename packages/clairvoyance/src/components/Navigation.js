import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import { Switch, Route } from 'react-router-dom';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

import Login from './Login';

const styleSheet = {
  flex: {
    flex: 1,
  },
};

const Navigation = props => {
  const { classes, onDrawerToggle, ...rest } = props;

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton onClick={onDrawerToggle}>
            <MenuIcon />
          </IconButton>
          <Switch>
            <Route path="/pages">
              <Typography variant="title" className={classes.flex}>
                Pages
              </Typography>
            </Route>
            <Route path="/articles">
              <Typography variant="title" className={classes.flex}>
                Articles
              </Typography>
            </Route>
            <Route path="/editor">
              <Typography variant="title" className={classes.flex}>
                Editor
              </Typography>
            </Route>
            <Route>
              <Typography variant="title" className={classes.flex}>
                Home
              </Typography>
            </Route>
          </Switch>
          <Login {...rest} />
        </Toolbar>
      </AppBar>
    </div>
  );
};

Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Navigation);
