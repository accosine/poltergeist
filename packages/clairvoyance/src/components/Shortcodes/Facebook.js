import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

const styleSheet = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  container: {
    display: 'inline',
  },
});

const facebookShortcode = ({ url, width, height, isVideo }) =>
  `[facebook url="${url}" width=${width} height=${height}${
    isVideo ? ' video' : ''
  }]`;

class Facebook extends Component {
  state = { open: false, url: '', width: '', height: '', isVideo: false };

  openDialog = () => {
    this.setState({ open: true });
  };

  closeDialog = () => {
    this.setState({ open: false, id: '' });
  };

  onInsert = () => {
    const shortcode = facebookShortcode(this.state);
    this.props.onShortcode(shortcode);
    this.closeDialog();
  };

  render() {
    const { classes } = this.props;
    const { url, width, height, isVideo } = this.state;
    return (
      <div className={classes.container}>
        <Button
          size="small"
          onClick={this.openDialog}
          className={classes.button}
        >
          Facebook Post
        </Button>
        <Dialog open={this.state.open} onClose={this.closeDialog}>
          <DialogTitle>{'Insert Facebook shortcode'}</DialogTitle>
          <DialogContent>
            <DialogContentText />
            <TextField
              label="URL"
              value={url}
              onChange={event => this.setState({ url: event.target.value })}
            />
            <TextField
              label="Width"
              value={width}
              type="number"
              onChange={event => this.setState({ width: event.target.value })}
            />
            <TextField
              label="Height"
              value={height}
              type="number"
              onChange={event => this.setState({ height: event.target.value })}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={isVideo}
                  onChange={(event, isVideo) => this.setState({ isVideo })}
                />
              }
              label="Only show video"
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

Facebook.propTypes = {
  classes: PropTypes.object.isRequired,
  onShortcode: PropTypes.func.isRequired,
};

export default withStyles(styleSheet)(Facebook);
