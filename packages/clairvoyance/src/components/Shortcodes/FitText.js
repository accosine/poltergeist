import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
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

const fitTextShortcode = ({ text, width, height, min, max }) =>
  `[fittext width=${width} height=${height} min=${min} max=${max}]${text}[/fittext]`;

class FitText extends Component {
  state = {
    open: false,
    text: '',
    width: '',
    height: '',
    min: '',
    max: '',
  };

  openDialog = () => {
    this.setState({ open: true });
  };

  closeDialog = () => {
    this.setState({ open: false, id: '' });
  };

  onInsert = () => {
    const shortcode = fitTextShortcode(this.state);
    this.props.onShortcode(shortcode);
    this.closeDialog();
  };

  render() {
    const { classes } = this.props;
    const { text, width, height, min, max } = this.state;
    return (
      <div className={classes.container}>
        <Button
          size="small"
          onClick={this.openDialog}
          className={classes.button}
        >
          Fit-Text
        </Button>
        <Dialog open={this.state.open} onClose={this.closeDialog}>
          <DialogTitle>{'Insert FitText shortcode'}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Min: min font size Max: max font size
            </DialogContentText>
            <TextField
              label="Text"
              multiline
              rows={2}
              value={text}
              onChange={event => this.setState({ text: event.target.value })}
            />
            <TextField
              label="Width"
              value={width}
              type="number"
              onChange={event => this.setState({ width: event.target.value })}
            />
            <TextField
              label="Height"
              value={height}
              type="number"
              onChange={event => this.setState({ height: event.target.value })}
            />
            <TextField
              label="Min"
              value={min}
              type="number"
              onChange={event => this.setState({ min: event.target.value })}
            />
            <TextField
              label="Max"
              value={max}
              type="number"
              onChange={event => this.setState({ max: event.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeDialog}>Cancel</Button>
            <Button onClick={this.onInsert}>Insert</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

FitText.propTypes = {
  classes: PropTypes.object.isRequired,
  onShortcode: PropTypes.func.isRequired,
};

export default withStyles(styleSheet)(FitText);
