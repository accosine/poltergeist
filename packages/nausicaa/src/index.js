import React, { createElement, Fragment } from 'react';
import ReactDOMServer from 'react-dom/server';
import Styletron from 'styletron-server';
import { StyletronProvider } from 'styletron-react';
import marksy from 'marksy';
import Shortcodes from './util/shortcodes';
import Head from './components/Head';
import Text from './components/Publication';
import Portal from './components/Portal';
import Start from './components/Start';
import ThemeProvider from './util/ThemeProvider';
import MarkdownComponents from './components/MarkdownComponents';
import getAmpScripts from './util/getAmpScripts';

import theme from './theme.js';

const initializeStyletron = () => {
  // begin incrementing classnames from 'ae' forward
  const styletron = new Styletron();
  styletron.msb = 1295;
  styletron.power = 2;
  styletron.offset = 374;
  return styletron;
};

const compile = marksy({
  createElement,
  elements: MarkdownComponents,
});

const Layout = ({ styles, body, frontmatter, kind, ampScripts, config }) => {
  return (
    <Fragment>
      <Head
        frontmatter={frontmatter}
        config={config}
        styles={styles}
        ampScripts={ampScripts}
        kind={kind}
        theme={theme}
      />
      <body dangerouslySetInnerHTML={{ __html: body }} />
    </Fragment>
  );
};

const article = (config, plugins) => ({ content, ...frontmatter }) => {
  const shortcodes = Shortcodes(config, plugins);

  const styletron = initializeStyletron();
  const { text, usedShortcodes } = shortcodes(content, styletron);
  const { tree: articleTree } = compile(
    text,
    { sanitize: false },
    { collection: frontmatter.collection }
  );

  const ampScripts = getAmpScripts(usedShortcodes, plugins);

  const appMarkup = ReactDOMServer.renderToStaticMarkup(
    <StyletronProvider styletron={styletron}>
      <ThemeProvider theme={theme}>
        <Text
          styletron={styletron}
          frontmatter={frontmatter}
          config={config}
          content={articleTree}
          kind="article"
        />
      </ThemeProvider>
    </StyletronProvider>
  );

  const html =
    '<!doctype html>' +
    '<html ⚡ lang="de">' +
    ReactDOMServer.renderToStaticMarkup(
      <Layout
        frontmatter={frontmatter}
        config={config}
        styles={styletron.getCss()}
        body={appMarkup}
        ampScripts={ampScripts}
        kind="article"
      />
    ) +
    '</html>';

  return html;
};

const page = (config, plugins) => ({ content, ...frontmatter }) => {
  const shortcodes = Shortcodes(config, plugins);

  const styletron = initializeStyletron();
  const { text, usedShortcodes } = shortcodes(content, styletron);
  const { tree: pageTree } = compile(
    text,
    { sanitize: false },
    { collection: frontmatter.collection }
  );

  const ampScripts = getAmpScripts(usedShortcodes, plugins);

  const appMarkup = ReactDOMServer.renderToStaticMarkup(
    <StyletronProvider styletron={styletron}>
      <ThemeProvider theme={theme}>
        <Text
          styletron={styletron}
          frontmatter={frontmatter}
          config={config}
          content={pageTree}
          kind="page"
        />
      </ThemeProvider>
    </StyletronProvider>
  );

  const html =
    '<!doctype html>' +
    '<html ⚡ lang="de">' +
    ReactDOMServer.renderToStaticMarkup(
      <Layout
        frontmatter={frontmatter}
        config={config}
        styles={styletron.getCss()}
        body={appMarkup}
        ampScripts={ampScripts}
        kind="page"
      />
    ) +
    '</html>';

  return html;
};

const portal = config => ({ articles, frontmatter }) => {
  const styletron = initializeStyletron();

  const body = ReactDOMServer.renderToStaticMarkup(
    <StyletronProvider styletron={styletron}>
      <ThemeProvider theme={theme}>
        <Portal
          styletron={styletron}
          frontmatter={frontmatter}
          articles={articles}
          config={config}
        />
      </ThemeProvider>
    </StyletronProvider>
  );

  const html =
    '<!doctype html>' +
    '<html ⚡ lang="de">' +
    ReactDOMServer.renderToStaticMarkup(
      <Layout
        frontmatter={frontmatter}
        config={config}
        styles={styletron.getCss()}
        body={body}
        kind="portal"
      />
    ) +
    '</html>';

  return html;
};

const start = config => ({ articles }) => {
  const styletron = initializeStyletron();

  const body = ReactDOMServer.renderToStaticMarkup(
    <StyletronProvider styletron={styletron}>
      <ThemeProvider theme={theme}>
        <Start styletron={styletron} articles={articles} config={config} />
      </ThemeProvider>
    </StyletronProvider>
  );

  const html =
    '<!doctype html>' +
    '<html ⚡ lang="de">' +
    ReactDOMServer.renderToStaticMarkup(
      <Layout
        frontmatter={{ layout: 'start', title: config.organization.altname }}
        config={config}
        styles={styletron.getCss()}
        body={body}
        kind="start"
      />
    ) +
    '</html>';

  return html;
};

export default (config, plugins) => {
  console.log(plugins);
  return {
    article: article(config, plugins),
    portal: portal(config),
    start: start(config),
    page: page(config, plugins),
  };
};
