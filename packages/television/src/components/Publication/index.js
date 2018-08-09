import React from 'react';
import PropTypes from 'prop-types';
import { styled } from 'styletron-react';

import Body from '../Body';
import Analytics from '../Analytics';
import SvgSpritemap from '../SvgSpritemap';
import SvgLogos from '../SvgLogos';
import Header from '../Header';
import Sharebuttons from './Sharebuttons';
import Menu from '../Menu';
import Footer from '../Footer';
import Hero from './Hero';
import Author from './Author';
import Container from '../Container';

const Main = styled('main', {
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
  <Body>
    <Menu styletron={styletron} collections={config.article.collections} />
    <Analytics accountId={config.googleanalytics} />
    <Container>
      <SvgLogos />
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
        {kind === 'article' && <Author config={config} author={author} />}
      </Main>
      <aside />
      <Footer styletron={styletron} config={config} />
      {lightbox ? (
        <amp-image-lightbox id="lightbox1" layout="nodisplay" />
      ) : null}
    </Container>
  </Body>
);

Publication.propTypes = {
  content: PropTypes.node.isRequired,
};
export default Publication;
