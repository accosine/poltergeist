import { styled } from 'styletron-react';
import { withTheme } from '../util/ThemeContext';

export default withTheme(
  styled('div', ({ $theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    '@media screen and (min-width: 1024px)': {
      alignItems: 'center',
    },
  }))
);
