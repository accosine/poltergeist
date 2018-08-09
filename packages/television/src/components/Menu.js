import React from 'react';
import PropTypes from 'prop-types';
import { styled } from 'styletron-react';

import { withTheme } from '../util/ThemeContext';
import AmpComponent from './AmpComponent';
import Link from './Link';

const Sidebar = withTheme(
  styled(AmpComponent('amp-sidebar'), ({ $theme }) => ({
    width: '75vw',
    background: $theme.white,
    '@media screen and (min-width: 1024px)': {
      width: '35vw',
    },
  }))
);

const Ul = withTheme(
  styled('ul', ({ $theme }) => ({
    fontSize: '6vw',
    textTransform: 'uppercase',
    textAlign: 'center',
    paddingLeft: '0',
    '@media screen and (min-width: 1024px)': {
      fontSize: '2vw',
    },
  }))
);

const Li = styled('li', {
  padding: '1vw 0',
  listStyle: 'none',
  '@media screen and (min-width: 1024px)': {
    padding: '0.3vw 0',
  },
});

const A = styled(Link, {
  color: 'inherit',
  textDecoration: 'initial',
  padding: 'inherit',
});

const MenuLogo = withTheme(
  styled('svg', ({ $theme }) => ({
    fill: $theme.grey[900],
    height: '19vw',
    width: '35vw',
    display: 'block',
    margin: '0 auto',
    '@media screen and (min-width: 1024px)': {
      width: '14vw',
      height: '8vw',
    },
  }))
);

const Menu = ({ styletron, collections }) => {
  return (
    <Sidebar id="menu" layout="nodisplay">
      <nav>
        <MenuLogo>
          <use xlinkHref="#biglogo" />
        </MenuLogo>
        <Ul>
          <Li>
            <A href="/">Start</A>
          </Li>
          <hr />
          {Object.keys(collections).map((collection, index) => (
            <Li key={index}>
              <A href={`/${collections[collection].slug}`}>
                {collections[collection].name}
              </A>
            </Li>
          ))}
        </Ul>
      </nav>
    </Sidebar>
  );
};

Menu.propTypes = {
  styletron: PropTypes.object.isRequired,
};

export default Menu;
