import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import FixedButton from './FixedButton';
import CreateIcon from '@material-ui/icons/Create';
import { useFirestoreCollectionSubscription } from '../firebase';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 2 * theme.spacing.unit,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
}));

// TODO: pagination/search
const CardList = ({ collection, CardComponent, path, history }) => {
  const classes = useStyles();
  const [elements, loading] = useFirestoreCollectionSubscription(collection);

  return (
    <div className={classes.root}>
      {loading ? (
        <CircularProgress />
      ) : (
        elements.map(({ slug, ...props }) => (
          <CardComponent
            key={slug}
            onClick={() => history.push(`${path}/${slug}`)}
            {...props}
          />
        ))
      )}
      <FixedButton component={Link} to={path} position="right">
        <CreateIcon />
      </FixedButton>
    </div>
  );
};

export default CardList;
