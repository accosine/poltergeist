import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

class Shortcode extends Component {
  state = {
    open: false,
    settings: {},
  };

  openDialog = () => {
    this.setState({ open: true });
  };

  closeDialog = () => {
    this.setState({ open: false, settings: {} });
  };

  onSettingsChange = (id, value) =>
    this.setState({ settings: { ...this.state.settings, [id]: value } });

  onInsert = () => {
    this.props.onShortcode(this.props.onInsert(this.state.settings));
    this.closeDialog();
  };

  render() {
    const { Content, label, title, isValid } = this.props;
    const { settings, open } = this.state;
    return (
      <>
        <Button size="small" onClick={this.openDialog}>
          {label}
        </Button>
        <Dialog open={open} onClose={this.closeDialog}>
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
            <Content
              settings={settings}
              onSettingsChange={this.onSettingsChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeDialog}>Cancel</Button>
            <Button disabled={!isValid(settings)} onClick={this.onInsert}>
              Insert
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

const LabelSwitch = ({ label, ...props }) => (
  <FormControlLabel control={<Switch {...props} />} label={label} />
);

export default Shortcode;
export {
  LabelSwitch as Switch,
  TextField as TextInput,
  DialogContentText as Text,
};
