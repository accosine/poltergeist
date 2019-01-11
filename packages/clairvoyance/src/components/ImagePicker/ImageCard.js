import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import classnames from 'classnames';
import addSizeSuffix from '../../util/addSizeSuffix';
import config from '../../config.js';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing.unit * 1,
    transition: 'box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out',
  },
  selected: {
    transform: 'translate(3px, 3px)',
  },
  card: {
    width: 350,
    borderRadius: theme.spacing.unit * 3,
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
}));

const ImageCard = ({ addSelection, reference, image, disabled }) => {
  const classes = useStyles();
  const [selected, setSelected] = useState(false);
  const registerSelection = key => {
    setSelected(true);
    addSelection(key);
  };

  return (
    <div className={classnames(classes.root, { [classes.selected]: selected })}>
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
          <Typography gutterBottom variant="h5" component="h2">
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
            onClick={() => registerSelection(reference)}
          >
            Add
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default ImageCard;
