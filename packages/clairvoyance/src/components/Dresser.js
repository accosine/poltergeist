import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListIcon from '@material-ui/icons/List';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  list: {
    width: 350,
  },
});

const Dresser = ({ open, onDrawerClose }) => {
  const classes = useStyles();

  return (
    <div>
      <Drawer open={open} onClick={onDrawerClose} onClose={onDrawerClose}>
        <div>
          <List className={classes.list} disablePadding>
            <ListItem button component={Link} to="/">
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button component={Link} to="/articles">
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary="Articles" />
            </ListItem>
            <ListItem button component={Link} to="/pages">
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary="Pages" />
            </ListItem>
            <ListItem button component={Link} to="/users">
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </div>
  );
};

export default Dresser;
