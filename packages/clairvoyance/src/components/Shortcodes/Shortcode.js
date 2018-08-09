import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import { FormControlLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

const styleSheet = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  container: {
    display: 'inline',
  },
});

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
    console.log(this.state.settings);
    this.props.onShortcode(this.props.onInsert(this.state.settings));
    this.closeDialog();
  };

  render() {
    const { Content, label, title, isValid, classes } = this.props;
    const { settings, open } = this.state;
    return (
      <div className={classes.container}>
        <Button
          size="small"
          onClick={this.openDialog}
          className={classes.button}
        >
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
      </div>
    );
  }
}

const LabelSwitch = ({ label, ...props }) => (
  <FormControlLabel control={<Switch {...props} />} label={label} />
);

export default withStyles(styleSheet)(Shortcode);
export {
  LabelSwitch as Switch,
  TextField as TextInput,
  DialogContentText as Text,
};
