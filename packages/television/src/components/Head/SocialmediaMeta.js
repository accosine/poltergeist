import React from 'react';
import addSizeSuffix from '../../util/addSizeSuffix';
export default ({
  config,
  kind,
  frontmatter: { title, description, slug, picture, collection },
}) => {
  const always = [
    <meta name="twitter:site" content={'@' + config.vanityurl} />,
    <meta
      name="twitter:title"
      content={title || config.article.collections[collection].name}
    />,
    <meta
      property="og:title"
      content={title || config.article.collections[collection].name}
    />,
    <meta property="og:locale" content="de_DE" />,
    <meta property="og:site_name" content={config.organization.name} />,
  ];

  switch (kind) {
    case 'article':
      return [
        [
          <meta name="twitter:card" content="summary_large_image" />,
          <meta name="twitter:description" content={description} />,
          <meta
            name="twitter:image"
            content={`${config.media}${addSizeSuffix(
              picture,
              config.images.large.suffix
            )}${config.mediasuffix}`}
          />,
        ],
        [
          <meta property="og:description" content={description} />,
          <meta property="og:type" content="article" />,
          <meta
            property="og:url"
            content={`${config.protocol}://${config.domain}/${
              config[kind].collections[collection].slug
            }/${slug}/`}
          />,
          <meta
            property="og:image"
            content={`${config.media}${addSizeSuffix(
              picture,
              config.images.large.suffix
            )}${config.mediasuffix}`}
          />,
        ],
        always,
      ];
    case 'portal':
      return [
        [
          <meta name="twitter:card" content="summary" />,
          <meta
            name="twitter:image"
            content={`${config.media}${config.organization.logo.path}${
              config.mediasuffix
            }`}
          />,
          <meta
            name="twitter:description"
            content={config.organization.altname}
          />,
        ],
        [
          <meta
            property="og:description"
            content={config.organization.altname}
          />,
          <meta
            property="og:url"
            content={`${config.protocol}://${config.domain}/${
              config.article.collections[collection].slug
            }
            }/${slug}/`}
          />,
          <meta
            property="og:image"
            content={`${config.media}${config.organization.logo.path}${
              config.mediasuffix
            }`}
          />,
        ],
        always,
      ];
    case 'start':
      return [
        [
          <meta name="twitter:card" content="summary" />,
          <meta
            name="twitter:image"
            content={`${config.media}${config.organization.logo.path}${
              config.mediasuffix
            }`}
          />,
          <meta
            name="twitter:description"
            content={config.organization.altname}
          />,
        ],
        [
          <meta
            property="og:description"
            content={config.organization.altname}
          />,
          <meta
            property="og:url"
            content={`${config.protocol}://${config.domain}`}
          />,
          <meta
            property="og:image"
            content={`${config.media}${config.organization.logo.path}${
              config.mediasuffix
            }`}
          />,
        ],
        always,
      ];
    case 'page':
      return [
        [
          <meta name="twitter:card" content="summary" />,
          <meta
            name="twitter:image"
            content={`${config.media}${config.organization.logo.path}${
              config.mediasuffix
            }`}
          />,
          <meta
            name="twitter:description"
            content={config.organization.altname}
          />,
        ],
        [
          <meta
            property="og:description"
            content={config.organization.altname}
          />,
          <meta
            property="og:url"
            content={`${config.protocol}://${config.domain}`}
          />,
          <meta
            property="og:image"
            content={`${config.media}${config.organization.logo.path}${
              config.mediasuffix
            }`}
          />,
        ],
        always,
      ];
    default:
      return null;
  }
};
