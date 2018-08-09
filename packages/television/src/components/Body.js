import { styled } from 'styletron-react';
import { withTheme } from '../util/ThemeContext';

export default withTheme(
  styled('body', ({ $theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    fontFamily:
      '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;',
    '@media screen and (min-width: 1024px)': {
      alignItems: 'center',
    },
    fontWeight: '400',
    fontStyle: 'normal',
    color: $theme.grey[900],
  }))
);

