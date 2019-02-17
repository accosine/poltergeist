import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
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

const useStyles = makeStyles(theme => ({
  imagePickerDialog: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

const Img = ({ onShortcode }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const onInsert = (selection, carouselSettings) => {
    console.log(selection);
    const html =
      selection.length > 1
        ? carouselShortcode(selection, carouselSettings)
        : imgShortcode(selection[0]);
    onShortcode(html);
    setOpen(false);
  };

  return (
    <>
      <Tooltip title="Image">
        <IconButton size="small" onClick={() => setOpen(true)}>
          <PhotoIcon />
        </IconButton>
      </Tooltip>
      {open ? (
        <Dialog fullScreen open={open} onClose={() => setOpen(false)}>
          <MediaManager
            onInsert={onInsert}
            onCancel={() => setOpen(false)}
            multiple
          >
            <DialogContent className={classes.imagePickerDialog}>
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
};

export default Img;
