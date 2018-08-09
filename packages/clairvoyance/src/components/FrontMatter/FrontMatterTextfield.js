import React from 'react';
import TextField from 'material-ui/TextField';

const FrontMatterTextfield = ({
  id,
  onChange,
  classes,
  inputType = 'text',
  multiline = false,
  rows = 1,
  rowsMax = 1,
  ...props
}) => (
  <TextField
    {...props}
    className={classes.textField}
    id={id}
    label={id}
    value={props[id]}
    onChange={event => onChange({ [id]: event.target.value })}
    margin="normal"
    type={inputType}
    multiline={multiline}
    rows={rows}
    rowsMax={rowsMax}
  />
);

export default FrontMatterTextfield;
