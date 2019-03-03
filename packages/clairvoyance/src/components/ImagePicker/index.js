import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import InfiniteScroll from 'react-infinite-scroll-component';

import ImageCard from './ImageCard';
import { withStyles } from '@material-ui/core/styles';
import { FirebaseContext } from '../../firebase';

// TODO: virtualized list of images for performance

const styleSheet = theme => ({
  container: {
    overflowY: 'scroll',
    height: '100%',
  },
  list: {
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
  loading: {
    position: 'fixed',
    top: 0,
    width: '100%',
  },
});

const PAGE_SIZE = 6;

class ImagePicker extends Component {
  static contextType = FirebaseContext;
  state = {
    images: [],
    selected: [],
    last: null,
    hasMore: true,
  };

  fetchImages = async () => {
    console.log('fetch images');
    const { images, last } = this.state;
    let query = this.context.firestore.collection('images').orderBy('name');
    if (last) {
      query = query.startAfter(last);
    }
    query = query.limit(PAGE_SIZE);

    const snapshots = await query.get();

    this.setState({
      images: [
        ...images,
        ...snapshots.docs.map(doc => ({ id: doc.id, ...doc.data() })),
      ],
      last: snapshots.docs[snapshots.docs.length - 1],
      hasMore: snapshots.docs.length !== 0,
    });
  };

  async componentDidMount() {
    this.fetchImages();
  }

  addSelection = key => {
    this.setState({ selected: [...this.state.selected, key] }, () => {
      this.props.onSelection(
        this.state.selected.map(id =>
          this.state.images.find(image => image.id === id)
        )
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
    const { hasMore, images } = this.state;

    return (
      <div id="scroll-target" className={classes.container}>
        <InfiniteScroll
          dataLength={images.length}
          next={this.fetchImages}
          hasMore={hasMore}
          loader={<LinearProgress className={classes.loading} />}
          scrollableTarget="scroll-target"
          className={classes.list}
        >
          {images.map(image => (
            <ImageCard
              key={image.id}
              disabled={!multiple && this.state.selected.length >= 1}
              addSelection={this.addSelection}
              image={image}
              reference={image.id}
              {...rest}
            />
          ))}
        </InfiniteScroll>
      </div>
    );
  }
}

ImagePicker.propTypes = {
  carouselSettings: PropTypes.object.isRequired,
  onCarouselSettings: PropTypes.func.isRequired,
};

export default withStyles(styleSheet)(ImagePicker);
