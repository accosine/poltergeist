import React, { Component } from 'react';
import Dialog, { DialogActions, DialogContent } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

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

class FrontMatterImagePicker extends Component {
  state = {
    open: false,
  };

  openDialog = () => {
    this.setState({ open: true });
  };

  closeDialog = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, onInsert } = this.props;
    return (
      <div className={classes.container}>
        <Button
          size="small"
          color="primary"
          variant="raised"
          onClick={this.openDialog}
          className={classes.button}
        >
          Img
        </Button>
        {this.state.open ? (
          <Dialog fullScreen open={this.state.open} onClose={this.closeDialog}>
            <MediaManager
              onInsert={selected => {
                onInsert(selected);
                this.closeDialog();
              }}
              onCancel={this.closeDialog}
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

export default withStyles(styleSheet)(FrontMatterImagePicker);
