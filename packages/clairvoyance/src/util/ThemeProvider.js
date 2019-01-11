import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

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
  typography: {
    useNextVariants: true,
  },
});

export default ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);
