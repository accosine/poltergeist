import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import { FormControlLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';

const styleSheet = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  container: {
    display: 'inline',
  },
});

const soundcloudShortcode = params =>
  // ATTENTION! This template string has significant whitespace - don't change!
  `[soundcloud id=${params.trackid}` +
  `${params.isVisual ? ' visual' : ''}` +
  `${!params.isVisual && params.color ? ' color=' + params.color : ''}` +
  `${params.height ? ' height=' + params.height : ''}` +
  ']';

class Soundcloud extends Component {
  state = {
    open: false,
    trackid: '',
    isVisual: false,
    color: '',
    height: '',
  };

  openDialog = () => {
    this.setState({ open: true });
  };

  closeDialog = () => {
    this.setState({
      open: false,
      trackid: '',
      isVisual: false,
      color: '',
      height: '',
    });
  };

  onInsert = () => {
    const html = soundcloudShortcode(this.state);
    this.props.onShortcode(html);
    this.closeDialog();
  };

  render() {
    const { classes } = this.props;
    const { trackid, isVisual, height, color } = this.state;
    return (
      <div className={classes.container}>
        <Button
          size="small"
          onClick={this.openDialog}
          className={classes.button}
        >
          Soundcloud
        </Button>
        <Dialog open={this.state.open} onClose={this.closeDialog}>
          <DialogTitle>{"Use Google's location service?"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Let Google help apps determine location. This means sending
              anonymous location data to Google, even when no apps are running.
            </DialogContentText>
            <TextField
              label="Soundcloud Track ID"
              value={trackid}
              onChange={event => this.setState({ trackid: event.target.value })}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={isVisual}
                  onChange={(event, isVisual) => this.setState({ isVisual })}
                />
              }
              label="Visual Mode"
            />
            {!isVisual ? (
              <TextField
                label="Color"
                value={color}
                onChange={event => this.setState({ color: event.target.value })}
              />
            ) : null}
            <TextField
              label="Height"
              type="number"
              value={height}
              onChange={event => this.setState({ height: event.target.value })}
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

Soundcloud.propTypes = {
  classes: PropTypes.object.isRequired,
  onShortcode: PropTypes.func.isRequired,
};

export default withStyles(styleSheet)(Soundcloud);
