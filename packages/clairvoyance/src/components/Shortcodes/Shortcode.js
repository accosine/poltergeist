import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

const Shortcode = ({
  Content,
  label,
  title,
  isValid,
  onShortcode,
  onInsert,
}) => {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState({});
  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);
  const submit = () => {
    onShortcode(onInsert(settings));
    closeDialog();
  };
  const onSettingsChange = (key, value) =>
    setSettings({ ...settings, [key]: value });

  return (
    <>
      <Button size="small" onClick={openDialog}>
        {label}
      </Button>
      <Dialog open={open} onClose={closeDialog}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Content settings={settings} onSettingsChange={onSettingsChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button disabled={!isValid(settings)} onClick={submit}>
            Insert
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const LabelSwitch = ({ label, ...props }) => (
  <FormControlLabel control={<Switch {...props} />} label={label} />
);

export default Shortcode;
export {
  LabelSwitch as Switch,
  TextField as TextInput,
  DialogContentText as Text,
};
