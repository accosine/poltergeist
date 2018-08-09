import React from 'react';
import { oneLine } from 'common-tags';
import { styled } from 'styletron-react';

import { withTheme } from '../util/ThemeContext';
import Link from './Link';

const Header = styled('header', {
  position: 'fixed',
  display: 'flex',
  left: 0,
  width: '100%',
  zIndex: 2,
});

const HeaderLogo = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
});

const HeaderSvg = withTheme(
  styled('svg', ({ $theme }) => ({
    fill: $theme.grey[700],
    paddingTop: '5vw',
    height: '5vh',
    filter: `drop-shadow(${$theme.white} 2px 2px 0px)`,
    '@media screen and (min-width: 1024px)': {
      paddingTop: '2vw',
    },
  }))
);

export default withTheme(({ $theme, styletron }) => {
  const hamburger = styletron.renderStyle({
    position: 'fixed',
    cursor: 'pointer',
    height: '14vw',
    margin: '1vw 0 0 3vw',
    textAlign: 'center',
    width: '14vw',
    zIndex: '1',
    '@media screen and (min-width: 1024px)': {
      height: '6vw',
      width: '6vw',
    },
  });

  const hamburgerSvg = styletron.renderStyle({
    position: 'absolute',
    marginTop: '35%',
    marginLeft: '-20%',
    width: '40%',
    fill: $theme.grey[700],
    filter: `drop-shadow(${$theme.white} 2px 2px 0px)`,
  });

  return (
    <Header>
      <div
        dangerouslySetInnerHTML={{
          __html: oneLine`
    <div on="tap:menu" role="button" tabindex="0" class="${hamburger}">
      <svg class="${hamburgerSvg}" viewBox="0 0 250 250">
        <path
          d="M 0 0 L 0 45 L 250 45 L 250 0 L 0 0 z M 0 75 L 0 120 L 250 120 L 250 75 L 0 75 z M 0 150 L 0 195 L 250 195 L 250 150 L 0 150 z "
        />
      </svg>
    </div>
    `,
        }}
      />
      <HeaderLogo>
        <Link href="/">
          <HeaderSvg>
            <use xlinkHref="#minilogo" />
          </HeaderSvg>
        </Link>
      </HeaderLogo>
    </Header>
  );
});
