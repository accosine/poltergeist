import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

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
    const { text, width, height, min, max } = this.state;
    return (
      <>
        <Button size="small" onClick={this.openDialog}>
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
      </>
    );
  }
}

export default FitText;
