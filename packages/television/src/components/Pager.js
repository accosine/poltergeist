import React from 'react';
import PropTypes from 'prop-types';
import { styled } from 'styletron-react';

import { withTheme } from '../util/ThemeContext';
import Link from './Link';

const Container = withTheme(
  styled('div', ({ $theme }) => ({
    color: $theme.grey[700],
    display: 'block',
    fontWeight: 500,
    fontSize: '9vw',
    margin: '10vw 5vw 5vw 5vw',
    padding: '1.5vw',
    textAlign: 'center',
    textDecoration: 'none',
    '@media screen and (min-width: 1024px)': {
      margin: '0vw 0vw 0vw 0vw',
      padding: '1.5vw',
      fontSize: '3vw',
    },
  }))
);

const ButtonActive = withTheme(
  styled(Link, ({ $theme }) => ({
    margin: '2vw',
    textDecoration: 'none',
    color: $theme.grey[900],
    '@media screen and (min-width: 1024px)': {
      margin: '2vw',
    },
  }))
);

const ButtonInactive = withTheme(
  styled('span', ({ $theme }) => ({
    margin: '2vw',
    textDecoration: 'none',
    color: $theme.grey[400],
    '@media screen and (min-width: 1024px)': {
      margin: '2vw',
    },
  }))
);

const Pager = ({
  prefixPath = '/',
  currentPage,
  pagerSize,
  articleCount,
  collection,
  config,
}) => {
  return (
    <Container>
      {currentPage === 1 ? (
        <ButtonInactive>|{'<'}</ButtonInactive>
      ) : (
        <ButtonActive href={prefixPath}>|{'<'}</ButtonActive>
      )}
      {currentPage > 1 ? (
        <ButtonActive
          href={`${prefixPath}${
            prefixPath.endsWith('/') && currentPage - 1 === 1
              ? ''
              : prefixPath.endsWith('/') && currentPage > 2
              ? currentPage - 1
              : !prefixPath.endsWith('/') && currentPage - 1 === 1
              ? ''
              : `/${currentPage - 1}`
          }`}
        >
          {'<'}
        </ButtonActive>
      ) : (
        <ButtonInactive>{'<'}</ButtonInactive>
      )}
      {currentPage} of {Math.ceil(articleCount / pagerSize)}
      {currentPage < Math.ceil(articleCount / pagerSize) ? (
        <ButtonActive
          href={`${prefixPath}${
            prefixPath.endsWith('/') ? '' : '/'
          }${currentPage + 1}`}
        >
          {'>'}
        </ButtonActive>
      ) : (
        <ButtonInactive>{'>'}</ButtonInactive>
      )}
      {currentPage === Math.ceil(articleCount / pagerSize) ? (
        <ButtonInactive>{'>'}|</ButtonInactive>
      ) : (
        <ButtonActive
          href={`${prefixPath}${prefixPath.endsWith('/') ? '' : '/'}${Math.ceil(
            articleCount / pagerSize
          )}`}
        >
          {'>'}|
        </ButtonActive>
      )}
    </Container>
  );
};

Pager.propTypes = {
  currentPage: PropTypes.number.isRequired,
  pagerSize: PropTypes.number.isRequired,
  articleCount: PropTypes.number.isRequired,
};

export default Pager;
