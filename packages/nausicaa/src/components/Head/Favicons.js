import React from 'react';
export default ({ config: { media, mediasuffix } }) => [
  <link
    rel="apple-touch-icon"
    sizes="57x57"
    href={`${media}apple-touch-icon-57x57.png${mediasuffix}`}
  />,
  <link
    rel="apple-touch-icon"
    sizes="60x60"
    href={`${media}apple-touch-icon-60x60.png${mediasuffix}`}
  />,
  <link
    rel="apple-touch-icon"
    sizes="72x72"
    href={`${media}apple-touch-icon-72x72.png${mediasuffix}`}
  />,
  <link
    rel="apple-touch-icon"
    sizes="76x76"
    href={`${media}apple-touch-icon-76x76.png${mediasuffix}`}
  />,
  <link
    rel="apple-touch-icon"
    sizes="114x114"
    href={`${media}apple-touch-icon-114x114.png${mediasuffix}`}
  />,
  <link
    rel="apple-touch-icon"
    sizes="120x120"
    href={`${media}apple-touch-icon-120x120.png${mediasuffix}`}
  />,
  <link
    rel="apple-touch-icon"
    sizes="144x144"
    href={`${media}apple-touch-icon-144x144.png${mediasuffix}`}
  />,
  <link
    rel="apple-touch-icon"
    sizes="152x152"
    href={`${media}apple-touch-icon-152x152.png${mediasuffix}`}
  />,
  <link
    rel="apple-touch-icon"
    sizes="180x180"
    href={`${media}apple-touch-icon-180x180.png${mediasuffix}`}
  />,
  <link
    rel="icon"
    type="image/png"
    href={`${media}favicon-32x32.png${mediasuffix}`}
    sizes="32x32"
  />,
  <link
    rel="icon"
    type="image/png"
    href={`${media}android-chrome-192x192.png${mediasuffix}`}
    sizes="192x192"
  />,
  <link
    rel="icon"
    type="image/png"
    href={`${media}favicon-96x96.png${mediasuffix}`}
    sizes="96x96"
  />,
  <link
    rel="icon"
    type="image/png"
    href={`${media}favicon-16x16.png${mediasuffix}`}
    sizes="16x16"
  />,
  <link
    rel="mask-icon"
    href={`${media}safari-pinned-tab.svg${mediasuffix}`}
    color="#5bbad5"
  />,
  <meta name="msapplication-TileColor" content="#da532c" />,
  <meta
    name="msapplication-TileImage"
    content={`${media}mstile-144x144.png${mediasuffix}`}
  />,
  <meta name="theme-color" content="#ffffff" />,
];
