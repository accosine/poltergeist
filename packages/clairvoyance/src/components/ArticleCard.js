import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import addSizeSuffix from '../util/addSizeSuffix';
import config from '../config.js';

const styles = theme => ({
  card: {
    display: 'flex',
    width: '80vw',
    marginBottom: theme.spacing.unit * 2,
    justifyContent: 'space-between',
    cursor: 'pointer',
    transition: 'box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out',
    '&:hover': {
      transform: 'translate(1px, 1px)',
    },
  },
  content: {
    flex: '1 1 auto',
  },
  cover: {
    width: '20%',
    flexShrink: 0,
  },
});

class MediaControlCard extends Component {
  state = {
    raised: false,
  };

  handleMouseEnter = () => this.setState({ raised: true });
  handleMouseLeave = () => this.setState({ raised: false });

  render() {
    const {
      classes,
      onClick,
      title,
      headline,
      description,
      picture,
    } = this.props;
    const { raised } = this.state;

    return (
      <Card
        raised={raised}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        className={classes.card}
        onClick={onClick}
      >
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
  }
}

MediaControlCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MediaControlCard);
