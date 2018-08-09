import React from 'react';
export default ({ config }) => {
  const schema = {
    '@context': 'http://schema.org',
    '@type': 'WebSite',
    name: config.organization.name,
    alternateName: config.organization.altname,
    url: config.protocol + '://' + config.domain,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
};
