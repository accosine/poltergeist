import React from 'react';
import PropTypes from 'prop-types';
import { injectStyle } from 'styletron-utils';
import { styled } from 'styletron-react';
import AmpComponent from './AmpComponent';

const Sidebar = styled(AmpComponent('amp-sidebar'), {
  fontFamily: 'Roboto, sans-serif',
  width: '75vw',
  background: '#fff',
  '@media screen and (min-width: 1024px)': {
    width: '35vw',
  },
});

const Ul = styled('ul', {
  color: '#333',
  fontSize: '6vw',
  textTransform: 'uppercase',
  textAlign: 'center',
  paddingLeft: '0',
  '@media screen and (min-width: 1024px)': {
    fontSize: '2vw',
  },
});

const Li = styled('li', {
  padding: '1vw 0',
  listStyle: 'none',
  '@media screen and (min-width: 1024px)': {
    padding: '0.3vw 0',
  },
});

const A = styled('a', {
  color: 'inherit',
  textDecoration: 'initial',
  padding: 'inherit',
});

const Menu = ({ styletron, collections }) => {
  const menuLogo = injectStyle(styletron, {
    height: '19vw',
    width: '35vw',
    display: 'block',
    margin: '0 auto',
    '@media screen and (min-width: 1024px)': {
      height: '8vw',
    },
  });

  return (
    <Sidebar id="menu" layout="nodisplay">
      <nav>
        <svg className={menuLogo}>
          <use xlinkHref="#nausika--logotext-use" />
        </svg>
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
