import React, { Component } from 'react';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import classnames from 'classnames';
import addSizeSuffix from '../../util/addSizeSuffix';
import config from '../../config.js';

const styleSheet = theme => ({
  root: {
    margin: theme.spacing.unit * 1,
    transition: 'box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out',
  },
  selected: {
    transform: 'translate(3px, 3px)',
  },
  card: {
    width: 350,
  },
  headline: {
    textOverflow: 'ellipsis',
  },
  media: {
    height: 200,
  },
  inlineText: {
    display: 'inline',
  },
});

class ImageCard extends Component {
  state = {
    selected: false,
  };

  registerSelection = key => {
    this.setState({ selected: true });
    this.props.addSelection(key);
  };

  render() {
    const { classes, reference, image, disabled } = this.props;
    const { selected } = this.state;

    return (
      <div
        className={classnames(classes.root, { [classes.selected]: selected })}
      >
        <Card raised={selected} className={classes.card}>
          <CardMedia
            className={classes.media}
            image={
              config.application.media +
              addSizeSuffix(image.name, '-s') +
              config.application.mediasuffix
            }
          />
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              {image.name}
            </Typography>
            {image.caption && (
              <Typography color="textSecondary">
                Caption:{' '}
                <Typography className={classes.inlineText} component="span">
                  {image.caption}
                </Typography>
              </Typography>
            )}
            {image.attribution && (
              <Typography color="textSecondary">
                Attribution:{' '}
                <Typography className={classes.inlineText} component="span">
                  {image.attribution}
                </Typography>
              </Typography>
            )}
            {image.alt && (
              <Typography color="textSecondary">
                Alt:{' '}
                <Typography className={classes.inlineText} component="span">
                  {image.alt}
                </Typography>
              </Typography>
            )}
          </CardContent>
          <CardActions>
            <Button
              size="small"
              color="primary"
              disabled={selected || disabled}
              onClick={() => this.registerSelection(reference)}
            >
              Add
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

ImageCard.defaultProps = {};

ImageCard.propTypes = {};

export default withStyles(styleSheet)(ImageCard);
