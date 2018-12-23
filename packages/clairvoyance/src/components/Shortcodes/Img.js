import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Tooltip from '@material-ui/core/Tooltip';
import PhotoIcon from '@material-ui/icons/Photo';

import MediaManager from '../MediaManager';
import MediaManagerTabs from '../MediaManager/Tabs';
import MediaManagerActions from '../MediaManager/Actions';

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
    return (
      <>
        <Tooltip title="Image">
          <IconButton size="small" onClick={this.openDialog}>
            <PhotoIcon />
          </IconButton>
        </Tooltip>
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
      </>
    );
  }
}

export default Img;
