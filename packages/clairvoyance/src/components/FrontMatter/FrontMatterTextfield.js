import React from 'react';
import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

const FrontMatterTextfield = ({
  id,
  onChange,
  inputType = 'text',
  multiline = false,
  rows = 1,
  rowsMax = 1,
  ...props
}) => {
  const classes = useStyles();
  return (
    <TextField
      className={classes.textField}
      id={id}
      label={id}
      value={props[id] || ''}
      onChange={event => onChange({ [id]: event.target.value })}
      margin="normal"
      type={inputType}
      multiline={multiline}
      rows={rows}
      rowsMax={rowsMax}
    />
  );
};

export default FrontMatterTextfield;
