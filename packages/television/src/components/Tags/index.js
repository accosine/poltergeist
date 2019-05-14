import React from 'react';

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
            prefixPath={'/' + config.tagpath + '/' + tag}
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

export default Portal;
