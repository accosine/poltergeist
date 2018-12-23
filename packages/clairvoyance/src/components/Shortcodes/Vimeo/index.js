import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';

import icon from './icon.svg';

const Icon = () => <img width="24" height="24" src={icon} alt="Vimeo" />;

const vimeoShortcode = videoid => `[vimeo videoid=${videoid}]`;

class Vimeo extends Component {
  state = { open: false, videoid: '' };

  openDialog = () => {
    this.setState({ open: true });
  };

  closeDialog = () => {
    this.setState({ open: false, videoid: '' });
  };

  onInsert = () => {
    const html = vimeoShortcode(this.state.videoid);
    this.props.onShortcode(html);
    this.closeDialog();
  };

  render() {
    const { videoid } = this.state;
    return (
      <>
        <Tooltip title="Vimeo">
          <IconButton size="small" onClick={this.openDialog}>
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
              label="Vimeo Video ID"
              value={videoid}
              onChange={event => this.setState({ videoid: event.target.value })}
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

export default Vimeo;
