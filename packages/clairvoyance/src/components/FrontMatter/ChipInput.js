import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const styles = theme => ({
  chip: {
    margin: theme.spacing.unit / 2,
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
});

class ChipsArray extends React.Component {
  handleRequestDelete = data => () => {
    const chipData = [...this.props.chipData];
    const chipToDelete = chipData.indexOf(data);
    chipData.splice(chipToDelete, 1);
    this.props.onChange(chipData);
  };

  render() {
    const { classes, chipData } = this.props;

    return (
      <div className={classes.row}>
        {chipData.map((data, index) => {
          return (
            <Chip
              label={data}
              key={data}
              onDelete={this.handleRequestDelete(data)}
              className={classes.chip}
            />
          );
        })}
      </div>
    );
  }
}

ChipsArray.propTypes = {
  classes: PropTypes.object.isRequired,
};

ChipsArray = withStyles(styles)(ChipsArray);

export default class ChipInput extends Component {
  state = {
    text: '',
  };

  handleChipAdd = () => {
    this.props.onChange([...this.props.chipData, this.state.text.trim()]);
    this.setState({ text: '' });
  };

  onKeyPress = event => {
    if (event.key === 'Enter') {
      this.handleChipAdd();
    }
  };

  render() {
    const { text } = this.state;
    const { onChange, chipData, id } = this.props;
    return (
      <div>
        <TextField
          onKeyPress={this.onKeyPress}
          label={id}
          value={text}
          onChange={event => this.setState({ text: event.target.value })}
          margin="normal"
        />
        <IconButton
          onClick={this.handleChipAdd}
          disabled={!text.trim().length || chipData.includes(text.trim())}
        >
          <AddCircleOutlineIcon />
        </IconButton>
        <ChipsArray chipData={chipData} onChange={onChange} />
      </div>
    );
  }
}
