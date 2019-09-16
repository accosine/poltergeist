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
import Tooltip from '@material-ui/core/Tooltip';

import icon from './icon.svg';

const Icon = () => <img height="14" src={icon} alt="Gfycat" />;

const styleSheet = theme => ({
  button: {
    margin: theme.spacing(),
  },
});

const gfycatShortcode = ({ id, noAutoplay, width, height }) =>
  `[gfycat id=${id} width=${width} height=${height}${
    noAutoplay ? ' noautoplay' : ''
  }]`;

class Gfycat extends Component {
  state = { open: false, id: '', noAutoplay: false, height: '', width: '' };

  openDialog = () => {
    this.setState({ open: true });
  };

  closeDialog = () => {
    this.setState({ open: false, id: '' });
  };

  onInsert = () => {
    const shortcode = gfycatShortcode(this.state);
    this.props.onShortcode(shortcode);
    this.closeDialog();
  };

  render() {
    const { classes } = this.props;
    const { id, noAutoplay, width, height } = this.state;
    return (
      <>
        <Tooltip title="Gfycat">
          <Button
            size="small"
            onClick={this.openDialog}
            className={classes.button}
          >
            <Icon />
          </Button>
        </Tooltip>
        <Dialog open={this.state.open} onClose={this.closeDialog}>
          <DialogTitle>{'Insert Gfycat shortcode'}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To specify the width and height in the code, copy it from the
              embed URL: Go to https://gfycat.com/name, where name is the Gfycat
              ID. Click the embed link icon (). Copy the width and height
              specified in the "Fixed iFRAME" field.
            </DialogContentText>
            <TextField
              label="Gfycat ID"
              value={id}
              onChange={event => this.setState({ id: event.target.value })}
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
                  checked={noAutoplay}
                  onChange={(event, noAutoplay) =>
                    this.setState({ noAutoplay })
                  }
                />
              }
              label="Disable Autoplay"
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

Gfycat.propTypes = {
  classes: PropTypes.object.isRequired,
  onShortcode: PropTypes.func.isRequired,
};

export default withStyles(styleSheet)(Gfycat);
