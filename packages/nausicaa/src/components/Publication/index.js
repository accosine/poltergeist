import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { styled } from 'styletron-react';

import Analytics from '../Analytics';
import SvgSpritemap from '../SvgSpritemap';
import Header from '../Header';
import Sharebuttons from './Sharebuttons';
import Menu from '../Menu';
import Footer from '../Footer';
import Hero from './Hero';
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

const Article = styled('article', {
  position: 'relative',
});

const Publication = ({
  content,
  styletron,
  config,
  kind,
  frontmatter: {
    date,
    collection,
    attribution,
    author,
    picture,
    alt,
    headline,
    subline,
    lightbox,
    slug,
    title,
  },
}) => (
  <Fragment>
    <Menu styletron={styletron} collections={config.article.collections} />
    <Analytics accountId={config.googleanalytics} />
    <Container>
      <SvgSpritemap styletron={styletron} />
      <Header styletron={styletron} />
      <Main id="main" role="main">
        <Hero
          config={config}
          collection={collection}
          picture={picture}
          author={author}
          alt={alt}
          attribution={attribution}
          headline={headline}
          subline={subline}
          date={date}
          kind={kind}
        />
        {kind === 'article' && (
          <Sharebuttons
            slug={slug}
            title={title}
            collection={collection}
            config={config}
            collections={config[kind].collections}
          />
        )}
        {kind === 'article' && (
          <AdContainer
            adnetwork={config.ads.adnetwork}
            adconfig={{ 'data-slot': config.ads.adslot }}
          />
        )}
        <Article>{content}</Article>
        {kind === 'article' && (
          <Sharebuttons
            slug={slug}
            title={title}
            collection={collection}
            config={config}
            collections={config[kind].collections}
          />
        )}
      </Main>
      <aside />
      <Footer styletron={styletron} config={config} />
      {lightbox ? (
        <amp-image-lightbox id="lightbox1" layout="nodisplay" />
      ) : null}
    </Container>
  </Fragment>
);

Publication.propTypes = {
  content: PropTypes.node.isRequired,
};
export default Publication;
