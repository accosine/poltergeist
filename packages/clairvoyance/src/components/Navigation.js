import React, { useState } from 'react';
import { styled } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import { Switch, Route } from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Dresser from './Dresser';
import Login from './Login';

const Headline = styled(Typography)({
  flex: 1,
});

const Navigation = ({ authenticated }) => {
  const [drawerOpen, setDrawerState] = useState(false);

  const toggleDrawer = () => setDrawerState(!drawerOpen);
  const closeDrawer = () => setDrawerState(false);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          {authenticated ? (
            <>
              <IconButton onClick={toggleDrawer}>
                <MenuIcon />
              </IconButton>
              <Switch>
                <Route path="/pages">
                  <Headline variant="h6">Pages</Headline>
                </Route>
                <Route path="/articles">
                  <Headline variant="h6">Articles</Headline>
                </Route>
                <Route path="/editor">
                  <Headline variant="h6">Editor</Headline>
                </Route>
                <Route path="/users">
                  <Headline variant="h6">Users</Headline>
                </Route>
                <Route>
                  <Headline variant="h6">Home</Headline>
                </Route>
              </Switch>
            </>
          ) : (
            <Headline variant="h6">Please log in</Headline>
          )}
          <Login />
        </Toolbar>
      </AppBar>
      <Dresser onDrawerClose={closeDrawer} open={drawerOpen} />
    </div>
  );
};

export default Navigation;
