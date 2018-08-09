import React from 'react';
import PropTypes from 'prop-types';
import { styled } from 'styletron-react';
import withTheme from '../../util/withTheme';

const Container = withTheme(
  styled('div', ({ styleProps: { theme } }) => ({
    color: theme.mausgrau,
    display: 'block',
    fontWeight: 500,
    fontSize: '10vw',
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
  styled('a', ({ styleProps: { theme } }) => ({
    margin: '2vw',
    textDecoration: 'none',
    color: theme.dunkelgrau,
    '@media screen and (min-width: 1024px)': {
      margin: '2vw',
    },
  }))
);

const ButtonInactive = withTheme(
  styled('a', ({ styleProps: { theme } }) => ({
    margin: '2vw',
    textDecoration: 'none',
    color: theme.hellgrau,
    '@media screen and (min-width: 1024px)': {
      margin: '2vw',
    },
  }))
);

const Pager = ({
  currentPage,
  pagerSize,
  articleCount,
  collection,
  config,
}) => (
  <Container>
    {currentPage === 1 ? (
      <ButtonInactive>|{'<'}</ButtonInactive>
    ) : (
      <ButtonActive href={'/' + config.article.collections[collection].slug}>
        |{'<'}
      </ButtonActive>
    )}
    {currentPage > 1 ? (
      <ButtonActive
        href={`/${config.article.collections[collection].slug}${
          currentPage - 1 > 1 ? '/' + (currentPage - 1) : ''
        }`}
      >
        {'<'}
      </ButtonActive>
    ) : (
      <ButtonInactive>|{'<'}</ButtonInactive>
    )}
    {currentPage} von {Math.ceil(articleCount / pagerSize)}
    {currentPage < Math.ceil(articleCount / pagerSize) ? (
      <ButtonActive
        href={`/${config.article.collections[collection].slug}/${currentPage +
          1}`}
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
        href={`/${config.article.collections[collection].slug}/${Math.ceil(
          articleCount / pagerSize
        )}`}
      >
        {'>'}|
      </ButtonActive>
    )}
  </Container>
);

Pager.propTypes = {
  currentPage: PropTypes.number.isRequired,
  pagerSize: PropTypes.number.isRequired,
  articleCount: PropTypes.number.isRequired,
};

export default Pager;
