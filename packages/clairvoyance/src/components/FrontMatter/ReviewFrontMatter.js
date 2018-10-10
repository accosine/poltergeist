import React, { Fragment } from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FrontMatterTextfield from './FrontMatterTextfield';

export default ({ itemtype, ...props }) => (
  <Fragment>
    <FormControl margin="normal">
      <InputLabel htmlFor="itemtype">type</InputLabel>
      <Select
        value={itemtype}
        onChange={event => props.onChange({ itemtype: event.target.value })}
        input={<Input id="itemtype" />}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value="movie">Movie</MenuItem>
        <MenuItem value="book">Book</MenuItem>
        ))}
      </Select>
    </FormControl>
    <FrontMatterTextfield id="itemname" {...props} />
    <FrontMatterTextfield id="director" {...props} />
    <FrontMatterTextfield id="releasedate" inputType="date" {...props} />
    <FrontMatterTextfield id="wikipediaurl" {...props} />
    <FrontMatterTextfield id="rating" {...props} />
    <FrontMatterTextfield id="verdict" {...props} />
    <FrontMatterTextfield id="reviewbody" {...props} />
  </Fragment>
);
