import React from 'react';
import PropTypes from 'prop-types';

import Body from '../Body';
import Documents from './Documents';
import Pager from '../Pager';
import Analytics from '../Analytics';
import SvgSpritemap from '../SvgSpritemap';
import SvgLogos from '../SvgLogos';
import Header from '../Header';
import Menu from '../Menu';
import Footer from '../Footer';
import Container from '../Container';
import Main from '../Main';
import Content from '../Content';

const Portal = ({
  styletron,
  frontmatter: { tag, pagination },
  documents,
  config,
}) => (
  <Body>
    <Menu
      styletron={styletron}
      config={config}
      collections={config.article.collections}
    />
    <Analytics accountId={config.googleanalytics} />
    <Container>
      <SvgLogos />
      <SvgSpritemap styletron={styletron} />
      <Header styletron={styletron} />
      <Main id="main" role="main">
        <Content>
          {documents.length ? (
            <Documents documents={documents} tag={tag} config={config} />
          ) : (
            'No articles in this collection'
          )}
        </Content>
        {documents.length ? (
          <Pager
            currentPage={pagination.currentPage}
            pagerSize={pagination.pagerSize}
            articleCount={pagination.documentCount}
            documents={documents}
            config={config}
          />
        ) : null}
      </Main>
      <aside />
      <Footer styletron={styletron} config={config} />
    </Container>
  </Body>
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
