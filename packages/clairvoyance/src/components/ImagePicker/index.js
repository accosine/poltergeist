import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import InfiniteScroll from 'react-infinite-scroll-component';

import ImageCard from './ImageCard';
import { withStyles } from '@material-ui/core/styles';
import { FirebaseContext } from '../../firebase';

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

const PAGE_SIZE = 3;

class ImagePicker extends Component {
  static contextType = FirebaseContext;
  state = {
    images: [],
    selected: [],
    last: null,
  };

  // getImageCount = async () =>
  //   (await this.context.firestore
  //     .collection('images')
  //     .select()
  //     .get()).docs.length;

  // getImages = async () => {
  //   const { images, page } = this.state;
  //   const start = page * PAGE_SIZE;
  //   const docs = await this.context.firestore
  //     .collection('images')
  //     .orderBy('name')
  //     .startAt(start)
  //     .limit(PAGE_SIZE)
  //     .get();
  //   console.log(docs);
  //
  //   this.setState({
  //     loading: false,
  //     images: [
  //       ...images.slice(0, start),
  //       ...docs.map(doc => ({ id: doc.id, ...doc.data() })),
  //       ...images.slice(start + PAGE_SIZE),
  //     ],
  //   });
  // };

  // asdfsd = async () => {
  //   var first = db
  //     .collection('cities')
  //     .orderBy('population')
  //     .limit(25);
  //
  //   const snapshots = await first.get();
  //   // Get the last visible document
  //   var lastVisible = snapshots.docs[snapshots.docs.length - 1];
  //   console.log('last', lastVisible);
  //
  //   // Construct a new query starting at this document,
  //   // get the next 25 cities.
  //   var next = db
  //     .collection('cities')
  //     .orderBy('population')
  //     .startAfter(lastVisible)
  //     .limit(25);
  // };

  fetchImages = async () => {
    console.log('fetch images');
    const { last } = this.state;
    let query = this.context.firestore.collection('images').orderBy('name');
    if (last) {
      query = query.startAfter(last);
    }
    query = query.limit(PAGE_SIZE);

    const snapshots = await query.get();

    this.setState({
      images: snapshots.docs.map(doc => ({ id: doc.id, ...doc.data() })),
      last: snapshots.docs[snapshots.docs.length - 1],
    });
  };

  async componentDidMount() {
    this.fetchImages();
  }

  // onNext = async () => {
  //   //   var next = db
  //   //     .collection('cities')
  //   //     .orderBy('population')
  //   //     .startAfter(lastVisible)
  //   //     .limit(25);
  //   this.setState({
  //     images: snapshots.docs.map(doc => ({ id: doc.id, ...doc.data() })),
  //     last: snapshots.docs[snapshots.docs.length - 1],
  //   });
  // };

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
        <InfiniteScroll
          dataLength={images.length}
          next={this.fetchImages}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          scrollableTarget="asdf"
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

//   Object.keys(images).length ? (
//   Object.keys(images).map(id => (
//     <ImageCard
//       key={id}
//       disabled={!multiple && this.state.selected.length >= 1}
//       addSelection={this.addSelection}
//       image={images[id]}
//       reference={id}
//       {...rest}
//     />
//   ))
// ) : (
//   'No images uploaded yet.'
// )}

export default withStyles(styleSheet)(ImagePicker);
