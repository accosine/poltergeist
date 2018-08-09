import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from 'material-ui/Progress';

import ImageCard from './ImageCard';
import { withStyles } from 'material-ui/styles';
import connectFirebase from '../../util/connect-firebase';

const styleSheet = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
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

class ImagePicker extends Component {
  state = {
    images: [],
    selected: [],
    loading: true,
  };

  componentDidMount() {
    this.firestoreUnsubscribe = this.props.firebase.firestore
      .collection('images')
      .onSnapshot(snapshot => {
        this.setState({
          loading: false,
          images: snapshot.docs.reduce(
            (obj, doc) => ({ ...obj, [doc.id]: doc.data() }),
            {}
          ),
        });
      });
  }

  componentWillUnmount() {
    // Remove database change listener
    this.firestoreUnsubscribe();
  }

  addSelection = key => {
    this.setState({ selected: [...this.state.selected, key] }, () => {
      this.props.onSelection(
        this.state.selected.map(key => this.state.images[key])
      );
    });
  };

  render() {
    const {
      classes,
      carouselSettings,
      onCarouselSettings,
      multiple,
      ...rest
    } = this.props;
    const { loading, images } = this.state;

    return (
      <div className={classes.container}>
        {loading ? (
          <CircularProgress />
        ) : Object.keys(images).length ? (
          Object.keys(images).map(id => (
            <ImageCard
              key={id}
              disabled={!multiple && this.state.selected.length >= 1}
              addSelection={this.addSelection}
              image={images[id]}
              reference={id}
              {...rest}
            />
          ))
        ) : (
          'No images uploaded yet.'
        )}
      </div>
    );
  }
}

ImagePicker.propTypes = {
  carouselSettings: PropTypes.object.isRequired,
  onCarouselSettings: PropTypes.func.isRequired,
};

export default withStyles(styleSheet)(connectFirebase(ImagePicker));
