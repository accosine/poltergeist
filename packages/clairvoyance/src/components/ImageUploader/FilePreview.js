import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';

import ChipInput from '../FrontMatter/ChipInput';

const styleSheet = theme => ({
  root: {
    padding: theme.spacing.unit * 1,
  },
  card: {
    position: 'relative',
    display: 'flex',
    width: '30vw',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    width: '60%',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: '75%',
    alignSelf: 'center',
  },
  image: {
    width: '100%',
  },
  input: {
    margin: theme.spacing.unit,
  },
  headline: {
    textOverflow: 'ellipsis',
  },
  removeButton: {
    position: 'absolute',
    right: 0,
  },
});

class FilePreview extends Component {
  state = {
    loaded: false,
  };

  componentDidMount() {
    this.reader = new FileReader();
    this.reader.readAsDataURL(this.props.file.nativeFile);
    this.reader.onload = event => {
      this.setState({ loaded: true });
    };
  }

  render() {
    const { classes, file, onFileChange, onFileRemove } = this.props;
    const { loaded } = this.state;

    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <IconButton className={classes.removeButton} onClick={onFileRemove}>
            <CloseIcon />
          </IconButton>
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography className={classes.headline} type="h5">
                {file.name}
              </Typography>
              <Input
                value={file.name}
                onChange={event => {
                  onFileChange({ name: event.target.value });
                }}
                placeholder="Name"
                className={classes.input}
              />
              <Input
                value={file.attribution}
                onChange={event => {
                  onFileChange({ attribution: event.target.value });
                }}
                placeholder="Attribution"
                className={classes.input}
              />
              <Input
                value={file.caption}
                onChange={event => {
                  onFileChange({ caption: event.target.value });
                }}
                placeholder="Caption"
                className={classes.input}
              />
              <Input
                value={file.alttext}
                onChange={event => {
                  onFileChange({ alttext: event.target.value });
                }}
                placeholder="Alt Text"
                className={classes.input}
              />
              <ChipInput
                id="Tags"
                onChange={tags => {
                  onFileChange({ tags });
                }}
                chipData={file.tags || []}
              />
            </CardContent>
          </div>
          <div className={classes.cover}>
            {loaded ? (
              <img
                onLoad={event => {
                  onFileChange({
                    width: event.target.width,
                    height: event.target.height,
                  });
                }}
                className={classes.image}
                src={this.reader.result}
                alt=""
              />
            ) : (
              <CircularProgress />
            )}
          </div>
        </Card>
      </div>
    );
  }
}

FilePreview.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(FilePreview);
