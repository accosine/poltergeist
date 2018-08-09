import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemText, ListItemIcon } from 'material-ui/List';
import ListIcon from 'material-ui-icons/List';
import HomeIcon from 'material-ui-icons/Home';
import { Link } from 'react-router-dom';

const styleSheet = {
  list: {
    width: 350,
  },
};

class Dresser extends Component {
  render() {
    const { classes, onDrawerClose } = this.props;

    return (
      <div>
        <Drawer
          open={this.props.open}
          onClick={onDrawerClose}
          onClose={onDrawerClose}
        >
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
            </List>
          </div>
        </Drawer>
      </div>
    );
  }
}

Dresser.propTypes = {
  classes: PropTypes.object.isRequired,
  onDrawerClose: PropTypes.func.isRequired,
};

export default withStyles(styleSheet)(Dresser);
