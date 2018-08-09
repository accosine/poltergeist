import { styled } from 'styletron-react';
import { withTheme } from '../util/ThemeContext';

export default withTheme(
  styled('div', ({ $theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }))
);
