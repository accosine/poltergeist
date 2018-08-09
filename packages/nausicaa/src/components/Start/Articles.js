import React from 'react';
import { styled } from 'styletron-react';
import { oneLine } from 'common-tags';

import withTheme from '../../util/withTheme';
import AmpComponent from '../AmpComponent';
import addSizeSuffix from '../../util/addSizeSuffix';
const AmpImg = AmpComponent('amp-img');

const Article = withTheme(
  styled('div', ({ styleProps: { theme, collection } }) => ({
    margin: '0 0 4vw 0',
    position: 'relative',
    '::after': {
      opacity: 0.3,
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundImage: `linear-gradient(${theme.drehungverlauf}, ${
        theme.collection(collection).verlauf
      })`,
    },
  }))
);

const Headline = withTheme(
  styled('h1', ({ styleProps: { theme } }) => ({
    bottom: '20vw',
    color: theme.eierschale,
    fontSize: '7vw',
    margin: '0vw 7vw',
    padding: '1vw 2vw',
    position: 'absolute',
    textShadow: '#333 1px 1px 1px',
    zIndex: 1,
    '@media screen and (min-width: 1024px)': {
      fontSize: '3vw',
      bottom: '7vw',
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

const Cover = withTheme(
  styled(AmpImg, ({ styleProps: { theme } }) => ({
    border: `2vw solid ${theme.eierschale}`,
  }))
);

const Figure = styled('figure', {
  margin: 0, // REMINDER: Add to CSS reset
});

const Articles = ({ kind, articles, collection, config }) => (
  <div>
    {articles.map(
      ({ picture, attribution, alt, slug, headline, subline }, n) => (
        <section key={slug}>
          <a href={`/${config.article.collections[collection].slug}/${slug}`}>
            <Article styleProps={{ collection }}>
              <Figure>
                <Cover
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
                <Headline>{headline}</Headline>
                <Figcaption>{attribution}</Figcaption>
              </Figure>
            </Article>
          </a>
        </section>
      )
    )}
  </div>
);

Articles.defaultProps = {};

Articles.propTypes = {};

export default Articles;
