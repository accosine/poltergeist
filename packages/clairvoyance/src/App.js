import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Home from './components/Home';
import SplitScreen from './components/SplitScreen';
import Articles from './components/Articles';
import Pages from './components/Pages';
import Navigation from './components/Navigation';
import Dresser from './components/Dresser';
import connectFirebase from './util/connect-firebase';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

const styleSheet = {
  app: {
    width: '100%',
    height: 'fit-content',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
};

const RenderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return React.createElement(component, finalProps);
};

const PrivateRoute = ({ component, redirectTo, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={routeProps =>
      isAuthenticated() ? (
        RenderMergedProps(component, routeProps, rest)
      ) : (
        <Redirect
          to={{
            pathname: redirectTo,
            state: { from: routeProps.location },
          }}
        />
      )
    }
  />
);

class App extends Component {
  render() {
    const {
      classes,
      firebase,
      user,
      open,
      onDrawerToggle,
      onDrawerClose,
    } = this.props;
    return (
      <Router basename="/admin">
        <div className={classes.app}>
          <Navigation onDrawerToggle={onDrawerToggle} user={user} />
          <Dresser
            onDrawerClose={onDrawerClose}
            isAuthenticated={firebase.isAuthenticated}
            open={open}
          />
          {/* <PrivateRoute */}
          {/*   path="/" */}
          {/*   exact */}
          {/*   isAuthenticated={firebase.isAuthenticated} */}
          {/*   component={Home} */}
          {/* /> */}
          <PrivateRoute
            path="/editor/:kind(page|article)/:slug?"
            isAuthenticated={firebase.isAuthenticated}
            component={SplitScreen}
          />
          <PrivateRoute
            path="/articles"
            isAuthenticated={firebase.isAuthenticated}
            component={Articles}
            redirectTo="/"
          />
          <PrivateRoute
            path="/pages"
            isAuthenticated={firebase.isAuthenticated}
            component={Pages}
            redirectTo="/"
          />
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
  onDrawerClose: PropTypes.func.isRequired,
  firebase: PropTypes.shape({
    auth: PropTypes.object.isRequired,
    authenticate: PropTypes.func.isRequired,
    firestore: PropTypes.object.isRequired,
    storage: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.func.isRequired,
  }).isRequired,
};

export default withStyles(styleSheet)(connectFirebase(App));
