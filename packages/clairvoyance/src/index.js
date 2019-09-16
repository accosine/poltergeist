import React from 'react';
import ReactDOM from 'react-dom';
import 'typeface-roboto';
import CssBaseline from '@material-ui/core/CssBaseline';

import ThemeProvider from './util/ThemeProvider';
import { FirebaseProvider } from './firebase';
import App from './App';

const Main = () => (
  <ThemeProvider>
    <FirebaseProvider>
      <CssBaseline />
      <App />
    </FirebaseProvider>
  </ThemeProvider>
);

// ReactDOM.unstable_createRoot(document.getElementById('root')).render(<Main />);
ReactDOM.render(<Main />, document.getElementById('root'));
