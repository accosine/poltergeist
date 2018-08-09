import React, { Fragment } from 'react';
import AmpComponent from '../../AmpComponent';
import Link from '../../Link';
import { styled } from 'styletron-react';
import { withTheme } from '../../../util/ThemeContext';
import formatDate from '../../../util/formatDate';
import addSizeSuffix from '../../../util/addSizeSuffix';
import { oneLine } from 'common-tags';
const AmpImg = AmpComponent('amp-img');

const Picture = styled('figcaption', {
  position: 'relative',
});

const PictureAttribution = withTheme(
  styled('figcaption', ({ $theme }) => ({
    color: $theme.grey[100],
    fontSize: '2.5vw',
    margin: '3vw',
    right: 0,
    bottom: 0,
    position: 'absolute',
    textShadow: `1px 1px ${$theme.black}`,
    '@media screen and (min-width: 1024px)': {
      fontSize: '10px',
      margin: '1vw',
    },
  }))
);

const Container = withTheme(
  styled('div', ({ $theme }) => ({
    margin: '0 auto',
    padding: '10px',
    width: '87vw',
    position: 'relative',
    background: $theme.white,
    lineHeight: 1,
    '@media screen and (min-width: 1024px)': {
      marginTop: 0,
      width: 'inherit',
    },
  }))
);

const Time = withTheme(
  styled('time', ({ $theme }) => ({
    color: $theme.grey[400],
    display: 'block',
    margin: '0vw 0vw 5vw 0vw',
    textAlign: 'center',
    '@media screen and (min-width: 1024px)': {
      margin: '0 0 2vw 0',
    },
  }))
);

const Breadcrumbs = withTheme(
  styled('p', ({ $theme, $collection }) => ({
    marginBottom: '5vw',
    color: $theme.grey[400],
    '@media screen and (min-width: 1024px)': {
      marginBottom: '2vw',
    },
  }))
);

const A = withTheme(
  styled(Link, ({ $theme, $collection }) => ({
    textDecoration: 'none',
    color: $theme.grey[400],
  }))
);

const ArticleHeadline = withTheme(
  styled('h1', ({ $theme }) => ({
    marginTop: '0',
    marginBottom: '3vw',
    color: $theme.grey[700],
    fontWeight: 300,
    '@media screen and (min-width: 1024px)': {
      fontSize: '2vw',
    },
  }))
);

const PageHeadline = withTheme(
  styled('h1', ({ $theme }) => ({
    margin: '10vw 0 5vw 0',
    textAlign: 'center',
    color: $theme.grey[700],
    fontSize: '1.8em',
    '@media screen and (min-width: 1024px)': {
      fontSize: '2vw',
    },
  }))
);

const Subline = withTheme(
  styled('h2', ({ $theme, $collection }) => ({
    backgroundColor: $theme.collection($collection).subline,
    fontSize: '5vw',
    color: $theme.white,
    padding: '2vw',
    margin: '0 0 3vw 0',
    '@media screen and (min-width: 1024px)': {
      fontSize: '2vw',
      padding: '1vw',
    },
  }))
);

export default ({
  config,
  picture,
  collection,
  date,
  headline,
  subline,
  attribution,
  author,
  alt,
  kind,
}) => (
  <Fragment>
    <Container>
      <Breadcrumbs $collection={collection}>
        <A $collection={collection} href="/">
          Start
        </A>
        {' > '}
        <A
          $collection={collection}
          href={`/${config[kind].collections[collection].slug}`}
        >
          {config[kind].collections[collection].name}
        </A>
      </Breadcrumbs>
      {kind === 'article' ? (
        <ArticleHeadline>{headline}</ArticleHeadline>
      ) : (
        <PageHeadline>{headline}</PageHeadline>
      )}
      {kind === 'article' && (
        <Time dateTime={formatDate(date, 'YYYY-MM-DD', 'en')}>
          {formatDate(date, 'DD. MMMM YYYY', 'de')}
        </Time>
      )}
    </Container>
    {kind === 'article' && (
      <Picture>
        <AmpImg
          width={4}
          height={3}
          src={oneLine`${config.media}${addSizeSuffix(
            picture,
            config.images.small.suffix
          )}${config.mediasuffix}`}
          srcset={oneLine`${config.media}${addSizeSuffix(
            picture,
            config.images.large.suffix
          )}${config.mediasuffix} ${config.images.large.size},
                  ${config.media}${addSizeSuffix(
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
        <PictureAttribution>{attribution}</PictureAttribution>
      </Picture>
    )}
    {subline && <Subline $collection={collection}>{subline}</Subline>}
  </Fragment>
);
