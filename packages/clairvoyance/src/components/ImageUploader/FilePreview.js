import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import { CircularProgress } from 'material-ui/Progress';
import Input from 'material-ui/Input';
import { withStyles } from 'material-ui/styles';

import ChipInput from '../FrontMatter/ChipInput';

const styleSheet = theme => ({
  root: {
    padding: theme.spacing.unit * 1,
  },
  card: {
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
});

// TODO: make all inputs controlled components and don't mutate files
class FilePreview extends Component {
  state = {
    loaded: false,
    tags: [],
  };

  componentDidMount() {
    this.reader = new FileReader();
    this.reader.readAsDataURL(this.props.file);
    this.reader.onload = event => {
      this.setState({ loaded: true });
    };
  }

  render() {
    const { classes, file } = this.props;
    const { tags, loaded } = this.state;

    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography className={classes.headline} type="headline">
                {file.name}
              </Typography>
              <Input
                onBlur={event => {
                  file.newname = event.target.value;
                }}
                placeholder="Name"
                className={classes.input}
              />
              <Input
                onBlur={event => {
                  file.newattribution = event.target.value;
                }}
                placeholder="Attribution"
                className={classes.input}
              />
              <Input
                onBlur={event => {
                  file.newcaption = event.target.value;
                }}
                placeholder="Caption"
                className={classes.input}
              />
              <Input
                onBlur={event => {
                  file.newalttext = event.target.value;
                }}
                placeholder="Alt Text"
                className={classes.input}
              />
              <ChipInput
                id="Tags"
                onChange={tags => {
                  this.setState({ tags });
                  file.tags = tags;
                }}
                chipData={tags}
              />
            </CardContent>
          </div>
          <div className={classes.cover}>
            {loaded ? (
              <img
                onLoad={event => {
                  file.width = event.target.width;
                  file.height = event.target.height;
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
