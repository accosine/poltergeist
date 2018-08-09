module.exports = {
  config: {
    domain: 'example.com',
    vanityurl: 'examplecom',
    protocol: 'https',
    googleanalytics: 'UA-12345678-9',
    images: {
      large: {
        suffix: '-l',
        size: '1280w',
        width: '1280',
        height: '960',
      },
      medium: {
        suffix: '-m',
        size: '640w',
        width: '640',
        height: '480',
      },
      small: {
        suffix: '-s',
        size: '320w',
        width: '320',
        height: '240',
      },
    },
    organization: {
      name: 'example',
      altname: 'example website',
      email: 'hi@example.com',
      banner: {
        path: 'example-banner.png',
        width: '154',
        height: '60',
      },
      logo: {
        path: 'example-logo.png',
        width: '800',
        height: '800',
      },
    },
    authors: {
      'Jon Doe': {
        name: 'Jon Doe',
        email: '',
        facebook: '',
        avatar: 'jondoe.jpg',
      },
    },
    collections: {
      Musik: 'musik',
    },
    layouts: {
      publication: {},
    },
    types: {
      artikel: {},
      rezension: {},
      video: {},
      rezept: {},
    },
    ads: {
      adnetwork: 'doubleclick',
      adslot: '/12345678/domain.com(Code)',
    },
    media:
      'https://firebasestorage.googleapis.com/v0/b/example-1234a.appspot.com/o/',
    mediasuffix: '?alt=media',
  },
  article1: {
    frontmatter: {
      title: 'Article Title',
      date: '2016-10-25',
      datemodified: '2016-12-17',
      slug: 'article-slug',
      author: 'Jon Doe',
      layout: 'publication',
      collection: 'Musik',
      headline: 'Article Headline!',
      subline: 'Test Article...',
      description:
        'This is a test article',
      picture: 'test-article.jpg',
      alt: 'test article cover',
      attribution: 'Jon Doe',
      type: 'artikel',
    },
    text: `## 1. Bob Dylan – Knockin’ On Heaven’s Door

First Song

[youtube videoid="UtWhioqshtw"]


## 2. Bruce Springsteen – I’m On Fire

Second Song

[youtube videoid="gntO-BadGk8"]


## 3. Nirvana – Smells Like Teen Spirit

Third Song

[youtube videoid="hTWKbfoikeg"]`
  },
};
