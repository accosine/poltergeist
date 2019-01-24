import React, { useState, memo } from 'react';
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';

import FrontMatterImagePicker from './FrontMatterImagePicker';
import FrontMatterTextfield from './FrontMatterTextfield';

import addSizeSuffix from '../../util/addSizeSuffix';
import config from '../../config.js';

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

const Media = ({ picture, attribution, alt, onChange }) => {
  const classes = useStyles();
  return (
    <>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cover}
          image={
            config.application.media +
            addSizeSuffix(picture, '-s') +
            config.application.mediasuffix
          }
          title="Live from space album cover"
        />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              Live From Space
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Mac Miller
            </Typography>
          </CardContent>
          <div className={classes.controls}>
            <IconButton aria-label="Previous">
              <SkipPreviousIcon />
            </IconButton>
            <IconButton aria-label="Play/pause">
              <PlayArrowIcon className={classes.playIcon} />
            </IconButton>
            <IconButton aria-label="Next">
              <SkipNextIcon />
            </IconButton>
          </div>
        </div>
      </Card>
      <FrontMatterImagePicker
        onInsert={selected => {
          onChange({ picture: selected.name });
          onChange({ attribution: selected.attribution });
          onChange({ alt: selected.alt });
        }}
      />
      <FrontMatterTextfield
        id="picture"
        picture={picture}
        onChange={onChange}
      />
      <FrontMatterTextfield
        id="attribution"
        attribution={attribution}
        onChange={onChange}
      />
      <FrontMatterTextfield id="alt" alt={alt} onChange={onChange} />
    </>
  );
};

//      <div className={classes.rowContainer}>
//        <FrontMatterImagePicker
//          onInsert={selected => {
//            props.onChange({ picture: selected.name });
//            props.onChange({ attribution: selected.attribution });
//            props.onChange({ alt: selected.alt });
//          }}
//        />
//        <FrontMatterTextfield id="picture" {...props} />
//        <FrontMatterTextfield id="attribution" {...props} />
//        <FrontMatterTextfield id="alt" {...props} />
//      </div>

export default Media;
