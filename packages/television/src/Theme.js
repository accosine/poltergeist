import React, { createElement } from 'react';
import ReactDOMServer from 'react-dom/server';
import { Server as StyletronServer } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import marksy from 'marksy';
import Shortcodes from './util/shortcodes';
import Head from './components/Head';
import Text from './components/Publication';
import Portal from './components/Portal';
import Start from './components/Start';
import { ThemeProvider } from './util/ThemeContext';
import { ConfigProvider } from './util/ConfigContext';
import MarkdownComponents from './components/MarkdownComponents';
import getAmpScripts from './util/getAmpScripts';

import colors from './colors.js';

const initializeStyletron = () => {
  const styletron = new StyletronServer();
  return styletron;
};

const compile = marksy({
  createElement,
  elements: MarkdownComponents,
});

const html = (head, body) =>
  `<!doctype html><html ⚡ lang="de">${head}${body}</html>`;

const Layout = ({ styles, body, frontmatter, kind, ampScripts, config }) => {
  return (
    <Head
      frontmatter={frontmatter}
      config={config}
      styles={styles}
      ampScripts={ampScripts}
      kind={kind}
      theme={colors}
    />
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

  const body = ReactDOMServer.renderToStaticMarkup(
    <StyletronProvider value={styletron}>
      <ThemeProvider value={colors}>
        <ConfigProvider value={config}>
          <Text
            styletron={styletron}
            frontmatter={frontmatter}
            config={config}
            content={articleTree}
            kind="article"
          />
        </ConfigProvider>
      </ThemeProvider>
    </StyletronProvider>
  );

  const head = ReactDOMServer.renderToStaticMarkup(
    <Layout
      frontmatter={frontmatter}
      config={config}
      styles={styletron.getCss()}
      ampScripts={ampScripts}
      kind="article"
    />
  );

  return html(head, body);
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

  const body = ReactDOMServer.renderToStaticMarkup(
    <StyletronProvider value={styletron}>
      <ThemeProvider value={colors}>
        <ConfigProvider value={config}>
          <Text
            styletron={styletron}
            frontmatter={frontmatter}
            config={config}
            content={pageTree}
            kind="page"
          />
        </ConfigProvider>
      </ThemeProvider>
    </StyletronProvider>
  );

  const head = ReactDOMServer.renderToStaticMarkup(
    <Layout
      frontmatter={frontmatter}
      config={config}
      styles={styletron.getCss()}
      ampScripts={ampScripts}
      kind="page"
    />
  );

  return html(head, body);
};

const portal = config => ({ articles, frontmatter }) => {
  const styletron = initializeStyletron();

  const body = ReactDOMServer.renderToStaticMarkup(
    <StyletronProvider value={styletron}>
      <ThemeProvider value={colors}>
        <ConfigProvider value={config}>
          <Portal
            styletron={styletron}
            frontmatter={frontmatter}
            articles={articles}
            config={config}
          />
        </ConfigProvider>
      </ThemeProvider>
    </StyletronProvider>
  );

  const head = ReactDOMServer.renderToStaticMarkup(
    <Layout
      frontmatter={frontmatter}
      config={config}
      styles={styletron.getCss()}
      body={body}
      kind="portal"
    />
  );

  return html(head, body);
};

const start = config => ({ articles, frontmatter }) => {
  const styletron = initializeStyletron();

  const body = ReactDOMServer.renderToStaticMarkup(
    <StyletronProvider value={styletron}>
      <ThemeProvider value={colors}>
        <ConfigProvider value={config}>
          <Start
            styletron={styletron}
            articles={articles}
            frontmatter={frontmatter}
            config={config}
          />
        </ConfigProvider>
      </ThemeProvider>
    </StyletronProvider>
  );

  const head = ReactDOMServer.renderToStaticMarkup(
    <Layout
      frontmatter={{ layout: 'start', title: config.organization.altname }}
      config={config}
      styles={styletron.getCss()}
      body={body}
      kind="start"
    />
  );

  return html(head, body);
};

export default (config, plugins) => ({
  article: article(config, plugins),
  portal: portal(config),
  start: start(config),
  page: page(config, plugins),
});
