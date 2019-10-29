import React, { createElement } from 'react';
import ReactDOMServer from 'react-dom/server';
import { Server as StyletronServer } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import marksy from 'marksy';

import Shortcodes from './util/shortcodes';
import colors from './colors.js';

import Head from './components/Head';
import Text from './components/Publication';
import Portal from './components/Portal';
import Tags from './components/Tags';
import Start from './components/Start';

import { ThemeProvider } from './util/ThemeContext';
import { ConfigProvider } from './util/ConfigContext';
import MarkdownComponents from './components/MarkdownComponents';
import getAmpScripts from './util/getAmpScripts';

const initializeStyletron = () => {
  const styletron = new StyletronServer();
  return styletron;
};

const compile = marksy({
  createElement,
  elements: MarkdownComponents,
});

const html = (head, body) =>
  `<!doctype html><html ⚡ lang="en">${head}${body}</html>`;

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

const tagged = config => ({ documents, frontmatter }) => {
  // return `<code>${JSON.stringify(documents, null, 2)}</code>
  // <code>${JSON.stringify(frontmatter, null, 2)}</code>`;

  const styletron = initializeStyletron();

  const body = ReactDOMServer.renderToStaticMarkup(
    <StyletronProvider value={styletron}>
      <ThemeProvider value={colors}>
        <ConfigProvider value={config}>
          <Tags
            styletron={styletron}
            frontmatter={frontmatter}
            documents={documents}
            config={config}
          />
        </ConfigProvider>
      </ThemeProvider>
    </StyletronProvider>
  );

  const head = ReactDOMServer.renderToStaticMarkup(
    <Layout
      frontmatter={{ ...frontmatter, title: frontmatter.tag }}
      config={config}
      styles={styletron.getCss()}
      body={body}
      kind="tags"
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

// TODO: tags
const sitemap = config => index => `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="//${config.domain}/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url><loc>${config.protocol}://${
  config.domain
}/sitemap-pages.xml</loc><lastmod>${index
  .filter(x => x.kind === 'page')
  .sort()[0]
  .modified.toISOString()}</lastmod></url>
  ${Object.entries(config.article.collections)
    .map(
      ([collection, { slug }]) =>
        `<url><loc>${config.protocol}://${
          config.domain
        }/sitemap-${slug}.xml</loc><lastmod>${index
          .filter(x => x.kind === 'article')
          .filter(x => x.collection === collection)
          .sort()[0]
          .modified.toISOString()}</lastmod></url>`
    )
    .join('\n  ')}
</urlset>`;

const sitemapCollection = config => index => `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="//${config.domain}/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url><loc>${config.protocol}://${config.domain}/${
  index[0].collection
}</loc><lastmod>${index.sort()[0].modified.toISOString()}</lastmod></url>
  ${index
    .sort()
    .map(
      ({ collection, slug, modified }) =>
        `<url><loc>${config.protocol}://${
          config.domain
        }/${collection}/${slug}</loc><lastmod>${modified.toISOString()}</lastmod></url>`
    )
    .join('\n  ')}
</urlset>`;

const sitemapPages = config => index => `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="//${config.domain}/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url><loc>${config.protocol}://${
  config.domain
}/</loc><lastmod>${index.sort()[0].modified.toISOString()}</lastmod></url>
  ${index
    .filter(x => x.kind === 'page')
    .sort()
    .map(
      ({ collection, slug, modified }) =>
        `<url><loc>${config.protocol}://${
          config.domain
        }/${slug}</loc><lastmod>${modified.toISOString()}</lastmod></url>`
    )
    .join('\n  ')}
</urlset>`;

export default (config, plugins = []) => ({
  article: article(config, plugins),
  portal: portal(config),
  tagged: tagged(config),
  start: start(config),
  page: page(config, plugins),
  sitemap: sitemap(config),
  sitemapCollection: sitemapCollection(config),
  sitemapPages: sitemapPages(config),
});
