import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';

const styleSheet = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  container: {
    display: 'inline',
  },
});

const instagramShortcode = (id, isCaptioned) =>
  `[instagram id=${id}${isCaptioned ? ' captioned' : ''}]`;

class Instagram extends Component {
  state = { open: false, id: '', isCaptioned: false };

  openDialog = () => {
    this.setState({ open: true });
  };

  closeDialog = () => {
    this.setState({ open: false, id: '' });
  };

  onInsert = () => {
    const { id, isCaptioned } = this.state;
    const html = instagramShortcode(id, isCaptioned);
    this.props.onShortcode(html);
    this.closeDialog();
  };

  render() {
    const { classes } = this.props;
    const { id, isCaptioned } = this.state;
    return (
      <div className={classes.container}>
        <Button
          size="small"
          onClick={this.openDialog}
          className={classes.button}
        >
          Instagram
        </Button>
        <Dialog open={this.state.open} onClose={this.closeDialog}>
          <DialogTitle>{"Use Google's location service?"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Let Google help apps determine location. This means sending
              anonymous location data to Google, even when no apps are running.
            </DialogContentText>
            <TextField
              label="Instagram Post ID"
              value={id}
              onChange={event => this.setState({ id: event.target.value })}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={isCaptioned}
                  onChange={(event, isCaptioned) =>
                    this.setState({ isCaptioned })
                  }
                />
              }
              label="Captioned"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeDialog}>Cancel</Button>
            <Button onClick={this.onInsert}>Insert</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

Instagram.propTypes = {
  classes: PropTypes.object.isRequired,
  onShortcode: PropTypes.func.isRequired,
};

export default withStyles(styleSheet)(Instagram);
