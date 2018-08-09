import React, { Fragment } from 'react';
import AmpComponent from '../../AmpComponent';
import { styled } from 'styletron-react';
import withTheme from '../../../util/withTheme';
import formatDate from '../../../util/formatDate';
import addSizeSuffix from '../../../util/addSizeSuffix';
import { oneLine } from 'common-tags';
const AmpImg = AmpComponent('amp-img');

const Picture = styled('figcaption', {
  position: 'relative',
});

const PictureAttribution = styled('figcaption', {
  color: 'aliceblue',
  fontSize: '2.5vw',
  margin: '3vw 5vw',
  position: 'absolute',
  right: '1vw',
  textShadow: '1px 1px black',
  '@media screen and (min-width: 1024px)': {
    fontSize: '10px',
    margin: '1vw 0vw',
  },
});

const Container = styled('div', {
  margin: '0 auto',
  padding: '10px',
  width: '87vw',
  position: 'relative',
  marginTop: '-15vw',
  background: 'white',
  lineHeight: 1,
  '@media screen and (min-width: 1024px)': {
    marginTop: 0,
    width: 'inherit',
  },
});

const Time = withTheme(
  styled('time', ({ styleProps: { theme } }) => ({
    display: 'block',
    margin: '0vw 0vw 5vw 0vw',
    color: theme.mausgrau,
    '@media screen and (min-width: 1024px)': {
      margin: '0 0 2vw 0',
    },
  }))
);

const Breadcrumbs = withTheme(
  styled('p', ({ styleProps: { theme, collection } }) => ({
    marginBottom: '5vw',
    color: theme.collection(collection).color,
    '@media screen and (min-width: 1024px)': {
      marginBottom: '2vw',
    },
  }))
);

const A = withTheme(
  styled('a', ({ styleProps: { theme, collection } }) => ({
    textDecoration: 'none',
    color: theme.collection(collection).color,
  }))
);

const Author = styled('div', {
  paddingTop: '4vw',
  height: '25vw',
  width: '25vw',
  margin: '0 auto',
  '@media screen and (min-width: 1024px)': {
    width: '10vw',
    height: '10vw',
  },
});

const AuthorName = styled('span', {
  display: 'block',
  fontSize: '3vw',
  textAlign: 'center',
  marginTop: '2vw',
  '@media screen and (min-width: 1024px)': {
    fontSize: '1vw',
  },
});

const AuthorPicture = withTheme(
  styled(AmpComponent('amp-img'), ({ styleProps: { theme } }) => ({
    boxShadow: `0px 2px 7px 0px ${theme.mausgrau}`,
    borderRadius: '100%',
  }))
);

const ArticleHeadline = withTheme(
  styled('h1', ({ styleProps: { theme } }) => ({
    marginBottom: '5vw',
    color: theme.mausgrau,
    '@media screen and (min-width: 1024px)': {
      fontSize: '5vw',
    },
  }))
);

const PageHeadline = withTheme(
  styled('h1', ({ styleProps: { theme } }) => ({
    margin: '10vw 0 5vw 0',
    textAlign: 'center',
    color: theme.mausgrau,
    fontSize: '1.8em',
    '@media screen and (min-width: 1024px)': {
      fontSize: '5vw',
    },
  }))
);

const Subline = withTheme(
  styled('h2', ({ styleProps: { theme, collection } }) => ({
    backgroundColor: theme.collection(collection).subline,
    fontSize: '5vw',
    color: 'white',
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
    <Container>
      {kind === 'article' && (
        <Breadcrumbs styleProps={{ collection }}>
          <A styleProps={{ collection }} href="/">
            Start
          </A>
          {' > '}
          <A
            styleProps={{ collection }}
            href={`/${config[kind].collections[collection].slug}`}
          >
            {config[kind].collections[collection].name}
          </A>
        </Breadcrumbs>
      )}
      {kind === 'article' && (
        <Time dateTime={formatDate(date, 'YYYY-MM-DD', 'en')}>
          {formatDate(date, 'DD. MMMM YYYY', 'de')}
        </Time>
      )}
      {kind === 'article' ? (
        <ArticleHeadline>{headline}</ArticleHeadline>
      ) : (
        <PageHeadline>{headline}</PageHeadline>
      )}
      {subline && <Subline styleProps={{ collection }}>{subline}</Subline>}
      {kind === 'article' && (
        <Fragment>
          <Author>
            <AuthorPicture
              width={4}
              height={4}
              src={`${config.media}${config.authors[author].avatar}${
                config.mediasuffix
              }`}
              alt={alt}
              attribution={attribution}
              layout="responsive"
            />
          </Author>
          <AuthorName>{config.authors[author].name}</AuthorName>
        </Fragment>
      )}
    </Container>
  </Fragment>
);
