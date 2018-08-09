import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { styled } from 'styletron-react';
import { oneLine } from 'common-tags';

import withTheme from '../../util/withTheme';
import AmpComponent from '../AmpComponent';
import addSizeSuffix from '../../util/addSizeSuffix';
const AmpImg = AmpComponent('amp-img');

const Headline = withTheme(
  styled('h1', ({ styleProps: { theme, collection } }) => ({
    color: theme.eierschale,
    background: theme.collection(collection).color,
    display: 'block',
    fontSize: '16vw',
    fontWeight: 500,
    margin: '10vw 5vw 5vw 5vw',
    padding: '1.5vw',
    textAlign: 'center',
    textDecoration: 'none',
    '@media screen and (min-width: 1024px)': {
      margin: '0vw 0vw 0vw 0vw',
      padding: '1.5vw',
      fontSize: '2vw',
    },
  }))
);

const Article = withTheme(
  styled('div', ({ styleProps: { theme } }) => ({
    margin: '0 0 8vw 0',
    position: 'relative',
    '::after': {
      backgroundImage: `linear-gradient(180deg, ${theme.transparent}, ${
        theme.black
      })`,
      content: '""',
      height: '50%',
      left: 0,
      position: 'absolute',
      top: '50%',
      width: '100%',
    },
    '@media screen and (min-width: 1024px)': {
      margin: '0 0 8vw 0',
    },
  }))
);

const ArticleHeadline = withTheme(
  styled('h2', ({ styleProps: { theme } }) => ({
    top: '36vw',
    color: theme.eierschale,
    fontSize: '7vw',
    margin: '0vw 7vw',
    padding: '1vw 2vw',
    position: 'absolute',
    textShadow: '#333 1px 1px 1px',
    zIndex: 1,
    '@media screen and (min-width: 1024px)': {
      top: '1vw',
      fontSize: '4vw',
      margin: '0vw 7vw',
      padding: '3vw 2vw',
    },
  }))
);

const ArticleSubline = withTheme(
  styled('h3', ({ styleProps: { theme } }) => ({
    top: '53vw',
    color: theme.eierschale,
    fontSize: '4vw',
    margin: '0vw 7vw',
    padding: '1vw 2vw',
    position: 'absolute',
    zIndex: 1,
    '@media screen and (min-width: 1024px)': {
      top: 'inherit',
      bottom: '4vw',
      fontSize: '2vw',
      margin: '0vw 7vw',
      padding: '1vw 2vw',
    },
  }))
);

const Figcaption = withTheme(
  styled('figcaption', ({ styleProps: { theme } }) => ({
    bottom: '0vw',
    color: theme.eierschale,
    fontSize: '2.5vw',
    margin: '3vw 5vw',
    position: 'absolute',
    textShadow: `${theme.grau} 1px 1px 1px`,
    zIndex: 1,
    '@media screen and (min-width: 1024px)': {
      fontSize: '0.7vw',
      margin: '3vw 3vw',
    },
  }))
);

const Figure = styled('figure', {
  margin: 0, // REMINDER: Add to CSS reset
});

const Listing = ({ articles, collection, config }) => (
  <Fragment>
    <Headline styleProps={{ collection }}>
      {config.article.collections[collection].name}
    </Headline>
    <div>
      {articles.map(
        ({ picture, attribution, alt, slug, headline, subline }) => (
          <section key={slug}>
            <a href={`/${config.article.collections[collection].slug}/${slug}`}>
              <Article>
                <Figure>
                  <AmpImg
                    width={4}
                    height={3}
                    src={oneLine`${config.media}${addSizeSuffix(
                      picture,
                      config.images.medium.suffix
                    )}${config.mediasuffix}`}
                    srcset={oneLine`${config.media}${addSizeSuffix(
                      picture,
                      config.images.medium.suffix
                    )}${config.mediasuffix} ${config.images.medium.size},
                  ${config.media}${addSizeSuffix(
                      picture,
                      config.images.small.suffix
                    )}${config.mediasuffix} ${config.images.small.size}`}
                    alt={alt}
                    attribution={attribution}
                    layout="responsive"
                  />
                  <Figcaption>{attribution}</Figcaption>
                </Figure>
                <ArticleHeadline>{headline}</ArticleHeadline>
                <ArticleSubline>{subline}</ArticleSubline>
              </Article>
            </a>
          </section>
        )
      )}
    </div>
  </Fragment>
);

Listing.defaultProps = {};

Listing.propTypes = {};

export default Listing;
