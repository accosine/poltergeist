import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';

import icon from './icon.svg';

const Icon = () => <img width="24" height="24" src={icon} alt="Facebook" />;

const facebookCommentsShortcode = ({ url, width, height, numposts }) =>
  `[facebookcomments url="${url}" width=${width} height=${height} numposts=${numposts}]`;

class FacebookComments extends Component {
  state = { open: false, url: '', width: '', height: '', numposts: '' };

  openDialog = () => {
    this.setState({ open: true });
  };

  closeDialog = () => {
    this.setState({ open: false, id: '' });
  };

  onInsert = () => {
    const shortcode = facebookCommentsShortcode(this.state);
    this.props.onShortcode(shortcode);
    this.closeDialog();
  };

  render() {
    const { url, width, height, numposts } = this.state;
    return (
      <>
        <Tooltip title="Facebook Comments">
          <Button size="small" onClick={this.openDialog}>
            <Icon />
            Comments
          </Button>
        </Tooltip>
        <Dialog open={this.state.open} onClose={this.closeDialog}>
          <DialogTitle>{'Insert Facebook Comments shortcode'}</DialogTitle>
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
            <TextField
              label="Num Posts"
              value={numposts}
              type="number"
              onChange={event =>
                this.setState({ numposts: event.target.value })
              }
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

export default FacebookComments;
