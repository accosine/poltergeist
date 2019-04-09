import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import FixedButton from './FixedButton';
import CreateIcon from '@material-ui/icons/Create';
import LinearProgress from '@material-ui/core/LinearProgress';
import InfiniteScroll from 'react-infinite-scroll-component';

import { useFirebaseContext } from '../firebase';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 2 * theme.spacing.unit,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'scroll',
    height: 0,
    flex: 1,
  },
  loading: {
    position: 'fixed',
    top: 0,
    width: '100%',
  },
}));

const PAGE_SIZE = 6;

// TODO: Keep in mind to prefill the <InfiniteScroll> component until it overflows
// TODO: pagination/search
const CardList = ({ collection, CardComponent, path, history }) => {
  const classes = useStyles();
  // TODO: Don't use subscriptions for article listing, use lazy loading
  const { firestore } = useFirebaseContext();
  const [elements, setElements] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [lastElement, setLastElement] = useState(null);

  const fetchElements = async () => {
    console.log('fetch elements');
    let query = firestore.collection(collection).orderBy('date');
    if (lastElement) {
      query = query.startAfter(lastElement);
    }
    query = query.limit(PAGE_SIZE);

    const snapshots = await query.get();

    setElements([
      ...elements,
      ...snapshots.docs.map(doc => ({ id: doc.id, ...doc.data() })),
    ]);
    setLastElement(snapshots.docs[snapshots.docs.length - 1]);
    setHasMore(snapshots.docs.length !== 0);
  };

  useEffect(
    () => {
      fetchElements();
    },
    [collection]
  );

  return (
    <div id="scroll-target" className={classes.root}>
      <InfiniteScroll
        dataLength={elements.length}
        next={fetchElements}
        hasMore={hasMore}
        loader={<LinearProgress className={classes.loading} />}
        scrollableTarget="scroll-target"
        className={classes.list}
        style={{ overflow: 'unset' }}
      >
        {elements.map(({ slug, ...props }) => (
          <CardComponent
            key={slug}
            onClick={() => history.push(`${path}/${slug}`)}
            {...props}
          />
        ))}
      </InfiniteScroll>

      <FixedButton component={Link} to={path} position="right">
        <CreateIcon />
      </FixedButton>
    </div>
  );
};

export default CardList;
