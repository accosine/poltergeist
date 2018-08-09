import React from 'react';
import { oneLine } from 'common-tags';
import { injectStyle } from 'styletron-utils';
import { styled } from 'styletron-react';

const Header = styled('header', {
  display: 'flex',
  left: 0,
  marginTop: '2vw',
  position: 'fixed',
  width: '100%',
  zIndex: 2,
});

export default ({ styletron }) => {
  const hamburger = injectStyle(styletron, {
    position: 'relative',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: '50%',
    border: '2vw solid rgba(53, 47, 47, 0.1)',
    cursor: 'pointer',
    fontSize: '11vw',
    fontWeight: '700',
    height: '14vw',
    margin: '1vw 0 0 3vw',
    textAlign: 'center',
    width: '14vw',
    '@media screen and (min-width: 1024px)': {
      height: '6vw',
      width: '6vw',
    },
  });

  const hamburgerSvg = injectStyle(styletron, {
    position: 'absolute',
    marginTop: '35%',
    marginLeft: '-20%',
    width: '40%',
    fill: '#fff',
  });

  const headerLogo = injectStyle(styletron, {
    marginLeft: '15vw',
    '@media screen and (min-width: 1024px)': {
      marginLeft: '20vw',
    },
  });

  const headerSvg = injectStyle(styletron, {
    height: '19vw',
    width: '35vw',
    '@media screen and (min-width: 1024px)': {
      height: '7vw',
    },
  });

  return (
    <Header
      dangerouslySetInnerHTML={{
        __html: oneLine`
    <div on="tap:menu" role="button" tabindex="0" class="${hamburger}">
      <svg class="${hamburgerSvg}" viewBox="0 0 250 250">
        <path
          d="M 0 0 L 0 45 L 250 45 L 250 0 L 0 0 z M 0 75 L 0 120 L 250 120 L 250 75 L 0 75 z M 0 150 L 0 195 L 250 195 L 250 150 L 0 150 z "
        />
      </svg>
    </div>
    <div class="${headerLogo}">
      <a href="/">
        <svg class="${headerSvg}">
          <use xlink:href="#nausika--bubble-use" />
          <use xlink:href="#nausika--logotext-use" />
        </svg>
      </a>
    </div>
    `,
      }}
    />
  );
};
