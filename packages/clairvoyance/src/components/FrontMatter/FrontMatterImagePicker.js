import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';

import MediaManager from '../MediaManager';
import MediaManagerTabs from '../MediaManager/Tabs';
import MediaManagerActions from '../MediaManager/Actions';

const useStyles = makeStyles({
  container: {
    display: 'inline',
  },
  root: {
    flexGrow: 1,
  },
});

const FrontMatterImagePicker = ({ onInsert }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);

  return (
    <div className={classes.container}>
      <Button
        size="small"
        color="primary"
        variant="contained"
        onClick={openDialog}
        className={classes.button}
      >
        Img
      </Button>
      <Dialog fullScreen open={open} onClose={closeDialog}>
        <MediaManager
          onInsert={selected => {
            onInsert(selected);
            closeDialog();
          }}
          onCancel={closeDialog}
        >
          <DialogContent>
            <MediaManagerTabs />
          </DialogContent>
          <DialogActions>
            <MediaManagerActions />
          </DialogActions>
        </MediaManager>
      </Dialog>
    </div>
  );
};

export default FrontMatterImagePicker;
