import React from 'react';
import { styled } from 'styletron-react';

import Link from '../Link';
import { withTheme } from '../../util/ThemeContext';

const Article = withTheme(
  styled('div', ({ $theme, $collection }) => ({
    display: 'flex',
    flexDirection: 'column',
  }))
);

const ArticleHeadline = withTheme(
  styled('h2', ({ $theme }) => ({
    paddingBottom: '5vw',
    marginTop: '3vw',
    textTransform: 'uppercase',
    fontSize: '5vw',
    fontWeight: '600',
    lineHeight: '6.5vw',
    color: $theme.grey[900],
    borderBottom: `1vw solid ${$theme.grey[500]}`,
    '@media screen and (min-width: 1024px)': {
      marginTop: '1vw',
      textTransform: 'uppercase',
      fontSize: '3vw',
      lineHeight: 'initial',
    },
  }))
);

const Collection = withTheme(
  styled(Link, ({ $theme }) => ({
    display: 'inline-block',
    textDecoration: 'none',
    borderRadius: '6vw',
    backgroundColor: $theme.grey[400],
    color: $theme.white,
    padding: '0 2vw',
    boxShadow: 'none',
    transform: 'translate(0, 0)',
    transition: 'box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out',
    ':hover': {
      boxShadow: `0px 7px 0px 0px ${$theme.grey[200]}`,
      transform: 'translate(0px, -1px)',
    },
  }))
);

const Date = withTheme(
  styled('span', ({ $theme }) => ({
    textAlign: 'right',
    fontSize: '3vw',
    color: $theme.grey[500],
    '@media screen and (min-width: 1024px)': {
      fontSize: '1.5vw',
    },
  }))
);

const A = withTheme(
  styled(Link, ({ $theme }) => ({
    textDecoration: 'none',
    color: $theme.grey[900],
    ':visited': {
      color: $theme.grey[500],
    },
    ':hover': {
      color: $theme.grey[400],
    },
  }))
);
const CollectionHeadline = styled('h1', {
  textAlign: 'center',
});

const Articles = ({ articles, collection, config }) => (
  <div>
    <CollectionHeadline>
      <Collection href={`/${config.article.collections[collection].slug}`}>
        {collection}
      </Collection>
    </CollectionHeadline>
    {articles.map(
      ({ picture, attribution, alt, slug, headline, subline, date }) => (
        <section key={slug}>
          <Article>
            <Date>2018-07-09</Date>
            <ArticleHeadline>
              <A
                href={`/${config.article.collections[collection].slug}/${slug}`}
              >
                {headline}{' '}
              </A>
            </ArticleHeadline>
          </Article>
        </section>
      )
    )}
  </div>
);

export default Articles;
