import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import addSizeSuffix from '../util/addSizeSuffix';
import config from '../config.js';

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
    width: '80vw',
    marginBottom: theme.spacing(2),
    justifyContent: 'space-between',
    cursor: 'pointer',
    transition: 'box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out',
    '&:hover': {
      transform: 'translate(1px, 1px)',
      'box-shadow': theme.shadows[8],
    },
  },
  content: {
    flex: '1 1 auto',
  },
  cover: {
    width: '20%',
    flexShrink: 0,
  },
}));

const ArticleCard = ({ onClick, title, headline, description, picture }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card} onClick={onClick}>
      <CardContent className={classes.content}>
        <Typography align="left" variant="h5">
          {title}
        </Typography>
        <Typography align="left" variant="subtitle1">
          {headline}
        </Typography>
        <Typography align="left" variant="caption">
          {description}
        </Typography>
      </CardContent>
      {picture ? (
        <CardMedia
          className={classes.cover}
          image={
            config.application.media +
            addSizeSuffix(picture, '-s') +
            config.application.mediasuffix
          }
        />
      ) : null}
    </Card>
  );
};

export default ArticleCard;
