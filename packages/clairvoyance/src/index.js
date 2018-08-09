import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from 'material-ui/CssBaseline';
import { firebase } from '@firebase/app';
import '@firebase/storage';
import '@firebase/firestore';
import '@firebase/auth';
import 'typeface-roboto';
import App from './App';
import firebaseconfig from './config';
import ThemeProvider from './util/ThemeProvider';
import FirebaseProvider from './util/FirebaseProvider';

firebase.initializeApp(firebaseconfig);
const provider = new firebase.auth.FacebookAuthProvider();
const auth = firebase.auth();

const STORAGEKEY = 'KEY_FOR_LOCAL_STORAGE';

function isAuthenticated() {
  return !!auth.currentUser || !!localStorage.getItem(STORAGEKEY);
}

function authenticate(event) {
  auth
    .signInWithRedirect(provider)
    .then(result => {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const token = result.credential.accessToken;
      console.log('Token: ' + token);
      // The signed-in user info.
      const user = result.user;
      console.log(user);
    })
    .catch(error => {
      // Handle Errors here.
      console.log(error);
      // ...
    });
}

const firebaseApi = {
  auth,
  authenticate,
  firestore: firebase.firestore(),
  isAuthenticated,
  storage: firebase.storage(),
};

class Main extends Component {
  state = {
    open: false,
    user: {
      uid: '',
      team: '',
    },
  };

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        // console.log(user);
        window.localStorage.setItem(STORAGEKEY, user.uid);
        this.setState({
          user: {
            uid: user.uid,
            avatar: user.photoURL,
            name: user.displayName,
          },
        });
      } else {
        // User is signed out.
        window.localStorage.removeItem(STORAGEKEY);
        this.setState({ user: { uid: null } });
      }
    });
  }

  handleDrawerToggle = () => {
    this.setState({ open: !this.state.open });
  };

  handleDrawerClose = () => this.setState({ open: false });

  render() {
    return (
      <ThemeProvider>
        <CssBaseline />
        <FirebaseProvider firebase={firebaseApi}>
          <App
            {...this.state}
            onDrawerToggle={this.handleDrawerToggle}
            onDrawerClose={this.handleDrawerClose}
          />
        </FirebaseProvider>
      </ThemeProvider>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById('root'));
