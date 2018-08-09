import React from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#c6ffff',
      main: '#92efe5',
      dark: '#5fbcb3',
      contrastText: '#000000',
    },
    secondary: {
      light: '#69d8ff',
      main: '#00a7ff',
      dark: '#0079cb',
      contrastText: '#000000',
    },
  },
});

export default ({ children }) => (
  <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
);
