import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const WaitingUserDialog = ({ open, onClose, onSubmit }) => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('editor');

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add user to waitlist</DialogTitle>
      <DialogContent>
        <DialogContentText>asdlkfjadslkf</DialogContentText>
        <TextField
          value={email}
          onChange={e => setEmail(e.target.value)}
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
        />
        <FormControl>
          <InputLabel htmlFor="role">Role</InputLabel>
          <Select
            value={role}
            onChange={e => setRole(e.target.value)}
            inputProps={{
              name: 'role',
              id: 'role',
            }}
          >
            <MenuItem value="editor">Editor</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={() => onSubmit({ email, role })} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WaitingUserDialog;
