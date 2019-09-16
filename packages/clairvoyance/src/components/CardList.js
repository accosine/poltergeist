import React, { useRef, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import FixedButton from './FixedButton';
import CreateIcon from '@material-ui/icons/Create';
import LinearProgress from '@material-ui/core/LinearProgress';

import useScrollInfo from 'react-element-scroll-hook';
import { useFirebaseContext } from '../firebase';
import useInfiniteScroll from '../useInfiniteScroll';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: 0,
    flex: 1,
  },
  list: {
    overflowY: 'scroll',
    padding: 20,
  },
  loading: {
    position: 'fixed',
    top: 0,
    width: '100%',
  },
}));

const PAGE_SIZE = 2;

// TODO: pagination/search
const CardList = ({ collection, CardComponent, path, history }) => {
  const classes = useStyles();
  const { firestore } = useFirebaseContext();
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [lastElement, setLastElement] = useState(null);

  const [elements, setElements] = useState([]);
  // const scrollRef = useRef(null);

  const [{ y: scrollInfoY }, scrollRef] = useScrollInfo();

  const fetchElements = React.useCallback(
    async function fetchElements() {
      console.log('callback');
      setIsFetching(true);
      let query = firestore.collection(collection).orderBy('date');
      if (lastElement) {
        query = query.startAfter(lastElement);
      }
      query = query.limit(PAGE_SIZE);
      const snapshots = await query.get();

      setElements(e => [
        ...e,
        ...snapshots.docs.map(doc => ({ id: doc.id, ...doc.data() })),
      ]);
      setLastElement(snapshots.docs[snapshots.docs.length - 1]);
      setHasMore(snapshots.docs.length !== 0);
      setIsFetching(false);
    },
    [collection, firestore, lastElement]
  );

  // React.useEffect(() => {
  //   console.log(scrollInfoY);
  //   if (!isFetching && hasMore && scrollInfoY.percentage >= 0.9) {
  //     fetchElements();
  //   }
  // }, [scrollInfoY, fetchElements, hasMore, isFetching]);

  React.useEffect(() => {
    console.log(scrollInfoY);
    if (!isFetching && hasMore && scrollInfoY.className === 'no-scroll-y') {
      fetchElements();
    }
  }, [scrollInfoY, fetchElements, hasMore, isFetching]);

  return (
    <div className={classes.root}>
      <div ref={scrollRef} className={classes.list}>
        {elements.map(({ slug, ...props }) => (
          <CardComponent
            key={slug}
            onClick={() => history.push(`${path}/${slug}`)}
            {...props}
          />
        ))}
      </div>
      {/*isFetching && <LinearProgress className={classes.loading} /> */}

      <FixedButton component={Link} to={path} position="right">
        <CreateIcon />
      </FixedButton>
    </div>
  );
};

export default CardList;
