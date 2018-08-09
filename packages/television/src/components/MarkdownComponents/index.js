import React from 'react';
import { styled } from 'styletron-react';
import { withTheme } from '../../util/ThemeContext';

// withTheme needs to be used with every component to prevent context prop from
// appearing in DOM

const P = withTheme(
  styled('p', ({ $theme, $collection }) => ({
    margin: '4vw 6vw 4vw 6vw',
    color: $theme.grey[900],
    ':first-of-type:first-letter': {
      backgroundColor: $theme.collection($collection).backgroundcolor,
      borderStyle: 'solid',
      borderColor: $theme.collection($collection).border,
      color: $theme.collection($collection).invertcolor,
      float: 'left',
      fontWeight: 700,
      fontSize: '75px',
      lineHeight: '60px',
      marginRight: '6px',
      paddingBottom: '4px',
      paddingLeft: '3px',
      paddingRight: '3px',
      paddingTop: '4px',
    },
    '@media screen and (min-width: 1024px)': {
      fontSize: '18px',
      lineHeight: '1.4',
    },
  }))
);

const H2 = withTheme(
  styled('h2', ({ $theme }) => ({
    color: $theme.grey[700],
    fontWeight: 200,
    margin: '5vw 6vw 2vw 6vw',
    '@media screen and (min-width: 1024px)': {
      fontSize: '3vw',
    },
  }))
);

const H3 = withTheme(
  styled('h3', ({ $theme }) => ({
    color: $theme.grey[700],
    margin: '5vw 6vw 2vw 6vw',
    fontSize: '1.5rem',
  }))
);

const Hsmall = tag =>
  withTheme(
    styled(tag, ({ $theme }) => ({
      color: $theme.grey[700],
      margin: '5vw 6vw 2vw 6vw',
      fontSize: '1rem',
    }))
  );

const List = tag =>
  withTheme(
    styled(tag, ({ $theme }) => ({
      color: $theme.grey[700],
      margin: '0 6vw',
    }))
  );

const Block = withTheme(
  styled('blockquote', ({ $theme, $collection }) => ({
    color: $theme.white,
    border: `3vw solid ${$theme.white}`,
    padding: '4vw 0 0 0',
    margin: 0,
    backgroundImage: `linear-gradient(${$theme.gradientrotation}, ${
      $theme.collection($collection).gradient
    })`,
    boxShadow: `inset 0 0 30vw ${$theme.white}`,
    '@media screen and (min-width: 1024px)': {
      border: `1vw solid ${$theme.white}`,
    },
  }))
);

const BlockP = withTheme(
  styled('p', ({ $theme }) => ({
    textAlign: 'center',
    fontWeight: 'bold',
    color: $theme.grey[100],
    fontSize: '8vw',
    paddingTop: '14vw',
    paddingBottom: '14vw',
    '::before': {
      fontSize: '47vw',
      position: 'absolute',
      content: 'open-quote',
      margin: '-52vw 0 0 0',
      left: '5vw',
    },
    '::after': {
      fontSize: '47vw',
      position: 'absolute',
      content: 'close-quote',
      margin: '4vw 0 0 0',
      right: '5vw',
    },
    '@media screen and (min-width: 1024px)': {
      fontSize: '3vw',
      paddingTop: '1vw',
      paddingBottom: '1vw',
      '::before': {
        fontSize: '12vw',
        margin: '-14vw 0 0 0',
        left: '3vw',
      },
      '::after': {
        fontSize: '12vw',
        margin: '1vw 0 0 0',
        right: '3vw',
      },
    },
  }))
);

const Blockquote = ({ $context: { collection }, children }) => (
  <Block $collection={collection}>
    <BlockP>{children[1].props.children}</BlockP>
  </Block>
);

export default {
  p: P,
  h2: H2,
  h3: H3,
  h4: Hsmall('h4'),
  h5: Hsmall('h5'),
  h6: Hsmall('h6'),
  blockquote: Blockquote,
  ul: List('ul'),
  ol: List('ol'),
};
