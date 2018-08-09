import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';
import ImageUploader from '../ImageUploader';
import ImagePicker from '../ImagePicker';

const styleSheet = theme => ({
  root: {
    flexGrow: 1,
  },
  tabContainer: {
    padding: theme.spacing.unit * 3,
  },
});

class MediaManagerTabs extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

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
    const { classes } = this.props;
    const {
      mediamanager: {
        index,
        multiple,
        selection,
        carouselSettings,
        handleTabChange,
        onSelection,
        onCarouselSettings,
      },
    } = this.context;

    const content = (
      <div className={classes.tabContainer}>
        {index === 0 ? (
          <ImageUploader switchTab={handleTabChange} />
        ) : index === 1 ? (
          <ImagePicker
            onSelection={onSelection}
            selection={selection}
            onCarouselSettings={onCarouselSettings}
            carouselSettings={carouselSettings}
            multiple={multiple}
          />
        ) : (
          'Item Three'
        )}
      </div>
    );

    return (
      <div>
        <Paper className={classes.root}>
          <Tabs
            value={index}
            onChange={handleTabChange}
            indicatorColor="primary"
            centered
          >
            <Tab label="Upload" />
            <Tab label="Images" />
            <Tab label="Search" />
          </Tabs>
        </Paper>
        {content}
      </div>
    );
  }
}

export default withStyles(styleSheet)(MediaManagerTabs);
