import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';

import icon from './icon.svg';

const Icon = () => <img height="24" src={icon} alt="Playbuzz" />;

const playbuzzShortcode = ({ height, url, iteminfo }) =>
  `[playbuzz url="${url}" height=${height}${iteminfo ? ' iteminfo' : ''}]`;

class Playbuzz extends Component {
  state = { open: false, url: '', height: '', iteminfo: false };

  openDialog = () => {
    this.setState({ open: true });
  };

  closeDialog = () => {
    this.setState({ open: false, id: '' });
  };

  onInsert = () => {
    const shortcode = playbuzzShortcode(this.state);
    this.props.onShortcode(shortcode);
    this.closeDialog();
  };

  render() {
    const { height, url, iteminfo } = this.state;
    return (
      <>
        <Tooltip title="Playbuzz">
          <IconButton size="small" onClick={this.openDialog}>
            <Icon />
          </IconButton>
        </Tooltip>
        <Dialog open={this.state.open} onClose={this.closeDialog}>
          <DialogTitle>{'Insert Playbuzz shortcode'}</DialogTitle>
          <DialogContent>
            <DialogContentText />
            <TextField
              label="url"
              value={url}
              onChange={event => this.setState({ url: event.target.value })}
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
                  checked={iteminfo}
                  onChange={(event, iteminfo) => this.setState({ iteminfo })}
                />
              }
              label="whether to display data info, such as creation date, creator name, etc."
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

export default Playbuzz;
