import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from 'material-ui/Progress';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import FixedButton from './FixedButton';
import ArticleCard from './ArticleCard';
import CreateIcon from 'material-ui-icons/Create';
import connectFirebase from '../util/connect-firebase';

const styleSheet = theme => ({
  root: {
    marginTop: 2 * theme.spacing.unit,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
});

class Pages extends Component {
  state = { pages: [], loading: true };

  componentDidMount() {
    // TODO: use select() to get only slug and title
    this.firestoreUnsubscribe = this.props.firebase.firestore
      .collection('pages')
      // .select('slug', 'title', 'headline', 'description', 'picture')
      .onSnapshot(snapshot => {
        this.setState({
          pages: snapshot.docs.map(article => article.data()),
          loading: false,
        });
      });
  }

  componentWillUnmount() {
    // Remove database change listener
    this.firestoreUnsubscribe();
  }

  render() {
    const { classes, history } = this.props;
    const { loading, pages } = this.state;

    return (
      <div className={classes.root}>
        {loading ? (
          <CircularProgress />
        ) : (
          pages.map(({ slug, ...props }) => (
            <ArticleCard
              key={slug}
              onClick={() => history.push(`/editor/page/${slug}`)}
              {...props}
            />
          ))
        )}
        <FixedButton component={Link} to="/editor/page" position="right">
          <CreateIcon />
        </FixedButton>
      </div>
    );
  }
}

Pages.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(connectFirebase(Pages));
