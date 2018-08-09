import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { styled } from 'styletron-react';

import withTheme from '../../util/withTheme';
import Analytics from '../Analytics';
import SvgSpritemap from '../SvgSpritemap';
import Header from '../Header';
import Menu from '../Menu';
import Footer from '../Footer';
import Articles from './Articles';

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

const CollectionA = withTheme(
  styled('a', ({ styleProps: { theme } }) => ({
    color: theme.mausgrau,
    display: 'block',
    fontSize: '16vw',
    fontWeight: 500,
    margin: '10vw 5vw 5vw 5vw',
    padding: '1.5vw',
    textAlign: 'center',
    textDecoration: 'none',
    '@media screen and (min-width: 1024px)': {
      fontSize: '8vw',
      margin: '5vw 0vw 5vw 0vw',
    },
  }))
);

const Start = ({ styletron, articles, config }) => (
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
        <div>
          {articles.map(collectionArticles => (
            <Fragment key={collectionArticles.collection}>
              <CollectionA
                href={`/${
                  config.article.collections[collectionArticles.collection].slug
                }`}
              >
                {config.article.collections[collectionArticles.collection].name}
              </CollectionA>
              <Articles
                articles={collectionArticles.articles}
                collection={collectionArticles.collection}
                config={config}
              />
            </Fragment>
          ))}
        </div>
      </Main>
      <aside />
      <Footer styletron={styletron} config={config} />
    </Container>
  </Fragment>
);

Start.propTypes = {
  config: PropTypes.object.isRequired,
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      collection: PropTypes.string.isRequired,
      articles: PropTypes.array.isRequired,
    })
  ).isRequired,
};

export default Start;
