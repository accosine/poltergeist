import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { styled } from 'styletron-react';

import Listing from './Listing';
import Pager from './Pager';

import Analytics from '../Analytics';
import SvgSpritemap from '../SvgSpritemap';
import Header from '../Header';
import Menu from '../Menu';
import Footer from '../Footer';
import AdContainer from '../AdContainer';

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  fontFamily: 'Roboto, sans-serif',
  '@media screen and (min-width: 1024px)': {
    alignItems: 'center',
  },
});

const Main = styled('main', {
  backgroundColor: '#f9fafb',
  marginTop: '23vw',
  '@media screen and (min-width: 1024px)': {
    width: '50vw',
    marginTop: '11vw',
  },
});

const Portal = ({
  styletron,
  articles,
  config,
  frontmatter: { collection, pagination },
}) => (
  <Fragment>
    <Menu
      styletron={styletron}
      config={config}
      collections={config.article.collections}
    />
    <Analytics accountId={config.googleanalytics} />
    <Container>
      <SvgSpritemap styletron={styletron} />
      <Header styletron={styletron} />
      <Main id="main" role="main">
        <AdContainer
          adnetwork={config.ads.adnetwork}
          adconfig={{ 'data-slot': config.ads.adslot }}
        />
        <Listing articles={articles} collection={collection} config={config} />
        <Pager
          currentPage={pagination.currentPage}
          pagerSize={pagination.pagerSize}
          articleCount={pagination.articleCount}
          collection={collection}
          config={config}
        />
      </Main>
      <aside />
      <Footer styletron={styletron} config={config} />
    </Container>
  </Fragment>
);

Portal.propTypes = {
  config: PropTypes.object.isRequired,
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      picture: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      headline: PropTypes.string.isRequired,
    })
  ).isRequired,
  frontmatter: PropTypes.shape({
    collection: PropTypes.string.isRequired,
    pagination: PropTypes.shape({
      currentPage: PropTypes.number.isRequired,
      pagerSize: PropTypes.number.isRequired,
      articleCount: PropTypes.number.isRequired,
    }),
  }).isRequired,
};

export default Portal;
