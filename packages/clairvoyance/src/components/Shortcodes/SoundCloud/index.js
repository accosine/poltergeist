import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import icon from './icon.svg';

const Icon = () => <img width="24" height="24" src={icon} alt="SoundCloud" />;

const soundcloudShortcode = params =>
  // ATTENTION! This template string has significant whitespace - don't change!
  `[soundcloud id=${params.trackid}` +
  `${params.isVisual ? ' visual' : ''}` +
  `${!params.isVisual && params.color ? ' color=' + params.color : ''}` +
  `${params.height ? ' height=' + params.height : ''}` +
  ']';

class SoundCloud extends Component {
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
    const { trackid, isVisual, height, color } = this.state;
    return (
      <>
        <Tooltip title="SoundCloud">
          <IconButton onClick={this.openDialog}>
            <Icon />
          </IconButton>
        </Tooltip>
        <Dialog open={this.state.open} onClose={this.closeDialog}>
          <DialogTitle>{"Use Google's location service?"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Let Google help apps determine location. This means sending
              anonymous location data to Google, even when no apps are running.
            </DialogContentText>
            <TextField
              label="SoundCloud Track ID"
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
      </>
    );
  }
}

export default SoundCloud;
