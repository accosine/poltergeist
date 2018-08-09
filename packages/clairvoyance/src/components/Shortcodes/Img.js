import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Dialog, { DialogActions, DialogContent } from 'material-ui/Dialog';

import MediaManager from '../MediaManager';
import MediaManagerTabs from '../MediaManager/Tabs';
import MediaManagerActions from '../MediaManager/Actions';

const styleSheet = {
  container: {
    display: 'inline',
  },
  root: {
    flexGrow: 1,
  },
};

const imgShortcode = (img, carousel) =>
  `[image ${
    carousel ? 'fill' : `width=${img.width} height=${img.height}`
  } name='${img.name}']`;
const carouselShortcode = (imgs, settings) =>
  `[carousel${settings.autoplay ? ` autoplay delay=${settings.delay}` : ''}${
    settings.loop ? ' loop' : ''
  }${settings.controls ? ' controls' : ''}]\n${imgs
    .map(img => imgShortcode(img, true))
    .join('\n')}\n[/carousel]`;

class Img extends Component {
  state = {
    open: false,
  };

  openDialog = () => {
    this.setState({ open: true });
  };

  closeDialog = () => {
    this.setState({ open: false });
  };

  onInsert = (selection, carouselSettings) => {
    const html =
      selection.length > 1
        ? carouselShortcode(selection, carouselSettings)
        : imgShortcode(selection[0]);
    this.props.onShortcode(html);
    this.closeDialog();
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <Button
          size="small"
          onClick={this.openDialog}
          className={classes.button}
        >
          Img
        </Button>
        {this.state.open ? (
          <Dialog fullScreen open={this.state.open} onClose={this.closeDialog}>
            <MediaManager
              onInsert={this.onInsert}
              onCancel={this.closeDialog}
              multiple
            >
              <DialogContent>
                <MediaManagerTabs />
              </DialogContent>
              <DialogActions>
                <MediaManagerActions />
              </DialogActions>
            </MediaManager>
          </Dialog>
        ) : null}
      </div>
    );
  }
}

Img.propTypes = {
  classes: PropTypes.object.isRequired,
  onShortcode: PropTypes.func.isRequired,
};

export default withStyles(styleSheet)(Img);
