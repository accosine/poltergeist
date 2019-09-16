import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import PhotoIcon from '@material-ui/icons/Photo';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import MediaManager from '../MediaManager';
import MediaManagerTabs from '../MediaManager/Tabs';
import MediaManagerActions from '../MediaManager/Actions';
import FrontMatterTextfield from './FrontMatterTextfield';

import addSizeSuffix from '../../util/addSizeSuffix';
import config from '../../config.js';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  content: {
    flex: '1 0 auto',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  previewContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  preview: {
    position: 'relative',
  },
  button: {
    position: 'absolute',
    right: 0,
    padding: 0,
    margin: 2,
  },
  avatar: {
    margin: theme.spacing(2),
    width: 130,
    height: 130,
  },
  cover: {
    width: 130 + theme.spacing(2),
    height: 130 + theme.spacing(2),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  imagePickerDialog: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

const Media = ({ picture, attribution, alt, onChange }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);

  return (
    <>
      <div className={classes.root}>
        <div className={classes.previewContainer}>
          <div className={classes.preview}>
            <IconButton onClick={openDialog} className={classes.button}>
              {picture ? (
                <PhotoLibraryIcon fontSize="large" />
              ) : (
                <AddIcon fontSize="large" />
              )}
            </IconButton>
            {picture ? (
              <CardMedia
                className={classes.cover}
                image={
                  config.application.media +
                  addSizeSuffix(picture, '-s') +
                  config.application.mediasuffix
                }
              />
            ) : (
              <Avatar className={classes.avatar}>
                <PhotoIcon fontSize="large" />
              </Avatar>
            )}
          </div>
        </div>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <FrontMatterTextfield
              id="picture"
              picture={picture}
              onChange={onChange}
              fullWidth
            />
            <FrontMatterTextfield
              id="attribution"
              attribution={attribution}
              onChange={onChange}
              fullWidth
            />
            <FrontMatterTextfield
              id="alt"
              alt={alt}
              onChange={onChange}
              fullWidth
            />
          </CardContent>
        </div>
      </div>
      <Dialog fullScreen open={open} onClose={closeDialog}>
        <MediaManager
          onInsert={selected => {
            onChange({ picture: selected.name });
            onChange({ attribution: selected.attribution });
            onChange({ alt: selected.alt });
            closeDialog();
          }}
          onCancel={closeDialog}
        >
          <DialogContent className={classes.imagePickerDialog}>
            <MediaManagerTabs />
          </DialogContent>
          <DialogActions>
            <MediaManagerActions />
          </DialogActions>
        </MediaManager>
      </Dialog>
    </>
  );
};

export default Media;
