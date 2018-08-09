import React from 'react';
import PropTypes from 'prop-types';

import Body from '../Body';
import Pager from '../Pager';
import Analytics from '../Analytics';
import SvgSpritemap from '../SvgSpritemap';
import SvgLogos from '../SvgLogos';
import Header from '../Header';
import Menu from '../Menu';
import Footer from '../Footer';
import Articles from './Articles';
import Container from '../Container';
import Main from '../Main';
import Content from '../Content';

const Start = ({
  styletron,
  articles,
  config,
  frontmatter: { collection, pagination },
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
          <Articles articles={articles} config={config} />
        </Content>
        <Pager
          currentPage={pagination.currentPage}
          pagerSize={pagination.pagerSize}
          articleCount={pagination.articleCount}
          config={config}
        />
      </Main>
      <aside />
      <Footer styletron={styletron} config={config} />
    </Container>
  </Body>
);

Start.propTypes = {
  config: PropTypes.object.isRequired,
  articles: PropTypes.array.isRequired,
};

export default Start;
