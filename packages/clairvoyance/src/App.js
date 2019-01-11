import React, { Suspense, lazy } from 'react';
import { makeStyles } from '@material-ui/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Home from './components/Home';
import Navigation from './components/Navigation';
import { useFirebaseContext } from './firebase';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

const SplitScreen = lazy(() => import('./components/SplitScreen'));
const Users = lazy(() => import('./components/Users'));
const Articles = lazy(() => import('./components/Articles'));
const Pages = lazy(() => import('./components/Pages'));

const useStyles = makeStyles({
  app: {
    width: '100%',
    height: 'fit-content',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
});

const App = () => {
  const classes = useStyles();
  const { isAuthenticated } = useFirebaseContext().authentication;

  return (
    <Router basename="/admin">
      <Suspense fallback={<LinearProgress color="secondary" />}>
        <div className={classes.app}>
          <Navigation authenticated={isAuthenticated} />
          {isAuthenticated ? (
            <>
              <Route path="/" exact component={Home} />
              <Route
                path="/editor/:kind(page|article)/:slug?"
                component={SplitScreen}
              />
              <Route path="/articles" component={Articles} redirectTo="/" />
              <Route path="/pages" component={Pages} redirectTo="/" />
              <Route path="/users" component={Users} redirectTo="/" />
            </>
          ) : (
            <>
              <Redirect to="/" />
            </>
          )}
        </div>
      </Suspense>
    </Router>
  );
};

export default App;
