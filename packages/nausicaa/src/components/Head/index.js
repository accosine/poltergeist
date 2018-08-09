import React from 'react';

import HeadPagination from './HeadPagination';
import SocialmediaMeta from './SocialmediaMeta';
import Schema from './Schema';
import SchemaSitename from './SchemaSitename';
import Font from './Font';
import StylesAmp from './StylesAmp';
import StylesCustom from './StylesCustom';
import Favicons from './Favicons';
import AmpScript from '../AmpScript';

import formatDate from '../../util/formatDate';

const Head = ({
  frontmatter,
  frontmatter: {
    title,
    date,
    datemodified,
    collection,
    attribution,
    author,
    picture,
    alt,
    headline,
    subline,
    lightbox,
    description,
    slug,
    pagination,
  },
  styles,
  body,
  config,
  ampScripts,
  kind,
  theme,
}) => (
  <head>
    <meta charSet="utf-8" />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <title>{title || config.article.collections[collection].name}</title>
    {kind === 'start' ? (
      <link rel="canonical" href={`${config.protocol}://${config.domain}`} />
    ) : null}
    {kind === 'article' ? (
      <link
        rel="canonical"
        href={`${config.protocol}://${config.domain}/${
          config[kind].collections[collection].slug
        }/${slug}`}
      />
    ) : null}
    {kind === 'portal' ? (
      <link
        rel="canonical"
        href={`${config.protocol}://${config.domain}/${
          config.article.collections[collection].slug
        }${pagination.currentPage > 1 ? '/' + pagination.currentPage : ''}`}
      />
    ) : null}
    {kind === 'page' ? (
      <link
        rel="canonical"
        href={`${config.protocol}://${config.domain}/${slug}`}
      />
    ) : null}
    {kind === 'portal' ? (
      <HeadPagination
        pagination={pagination}
        collection={config.article.collections[collection]}
        config={config}
      />
    ) : null}
    <meta
      name="viewport"
      content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=0"
    />
    <meta name="author" content={config.organization.name} />
    <meta name="copyright" content={config.organization.name} />
    <meta name="email" content={config.organization.email} />
    <meta name="date" content={formatDate(date, 'YYYY-MM-DD', 'de')} />
    <meta
      name="last-modified"
      content={formatDate(datemodified, 'YYYY-MM-DD', 'de')}
    />
    <meta name="description" content={description} />
    <SocialmediaMeta
      config={config}
      kind={kind}
      frontmatter={{ title, slug, picture, description, collection }}
    />
    {kind === 'publication' ? (
      <Schema {...frontmatter} config={config} />
    ) : null}
    <SchemaSitename config={config} />
    <Font />
    <Favicons config={config} />
    <meta property="fb:pages" content={config.fbpageid} />
    <AmpScript name="analytics" />
    <script async src="https://cdn.ampproject.org/v0.js" />
    <AmpScript name="ad" />
    <AmpScript name="user-notification" />
    <AmpScript name="sidebar" />
    {ampScripts.map((name, index) => <AmpScript key={index} name={name} />)}
    <StylesAmp />
    <StylesCustom styles={styles} theme={theme} />
  </head>
);

Head.defaultProps = {
  ampScripts: [],
};

export default Head;
