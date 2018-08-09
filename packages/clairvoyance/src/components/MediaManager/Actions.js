import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import CarouselSettings from '../ImagePicker/CarouselSettings';
import { withStyles } from 'material-ui/styles';

const styleSheet = {
  container: {
    width: '100%',
    padding: '0 70px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
};

class MediaManagerActions extends Component {
  static contextTypes = {
    mediamanager: PropTypes.shape({
      multiple: PropTypes.bool.isRequired,
      onInsert: PropTypes.func.isRequired,
      onCancel: PropTypes.func.isRequired,
      onSelection: PropTypes.func.isRequired,
      onCarouselSettings: PropTypes.func.isRequired,
      handleTabChange: PropTypes.func.isRequired,
      index: PropTypes.number.isRequired,
      selection: PropTypes.array.isRequired,
      carouselSettings: PropTypes.shape({
        autoplay: PropTypes.bool.isRequired,
        loop: PropTypes.bool.isRequired,
        controls: PropTypes.bool.isRequired,
        delay: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  };

  render() {
    const {
      mediamanager: {
        index,
        selection,
        onInsert,
        onCancel,
        onCarouselSettings,
        carouselSettings,
        multiple,
      },
    } = this.context;
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <div>
          {index === 1 && multiple && selection.length > 1 ? (
            <CarouselSettings
              onCarouselSettings={onCarouselSettings}
              carouselSettings={carouselSettings}
            />
          ) : null}
        </div>
        <div>
          {index === 1 && (
            <Button disabled={!selection.length} onClick={onInsert}>
              Insert
            </Button>
          )}
          <Button onClick={onCancel}>Cancel</Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styleSheet)(MediaManagerActions);
