export const config = {
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
  pager: {
    size: 3,
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
};

export const publicationProps = {
  frontmatter: {
    title: 'Article Title',
    date: '2016-10-25',
    datemodified: '2016-12-17',
    slug: 'article-slug',
    author: 'Hanni Hund',
    layout: 'publication',
    collection: 'Musik',
    headline: 'Article Headline!',
    subline: 'Test Article...',
    description: 'This is a test article',
    picture: 'test-article.jpg',
    alt: 'test article cover',
    attribution: 'Jon Doe',
    type: 'artikel',
    content: `## 1. Bob Dylan – Knockin’ On Heaven’s Door

First Song

[youtube videoid="UtWhioqshtw"]


## 2. Bruce Springsteen – I’m On Fire

Second Song

[youtube videoid="gntO-BadGk8"]


## 3. Nirvana – Smells Like Teen Spirit

Third Song

[youtube videoid="hTWKbfoikeg"]`,
  },
};

export const portalProps = {
  articles: [
    {
      alt: 'Darum solltest Du Serien kaufen!',
      attribution: 'Stefan Schreier',
      headline: 'Raubkopierern gehört die digitale Hand abgehackt!',
      subline:
        'Darum solltest Du „Game Of Thrones“ & Co. kaufen statt illegal herunterzuladen!',
      slug: 'darum-solltest-du-game-of-thrones-kaufen',
      picture: 'darum-serien-kaufen.jpg',
    },
    {
      slug: 'findet-dorie-rezension',
      picture: 'mircoohl_findet_dorie.jpg',
      alt: 'you see nothing',
      attribution: '',
      headline: 'Rezension - Findet Dorie',
      subline: 'Frische Gedanken zum Film',
    },
    {
      slug: 'kritik-zu-tote-maedchen-luegen-nicht',
      picture: 'tote-maedchen-luegen-nicht-160417.jpg',
      alt: 'Kritik Tote Mädchen lügen nicht',
      attribution: 'unsplash.com / Xavier Sotomayor',
      headline: 'Kritik zu Tote Mädchen lügen nicht',
      subline:
        'Warum die Netflix-Serie schlecht und gleichzeitig großartig ist!',
    },
  ],
  frontmatter: {
    collection: 'Fernsehen',
    pagination: { currentPage: 1, pagerSize: 3, articleCount: 7 },
  },
};

export const startProps = {
  articles: [
    {
      articles: [
        {
          headline: 'Raubkopierern gehört die digitale Hand abgehackt!',
          subline:
            'Darum solltest Du „Game Of Thrones“ & Co. kaufen statt illegal herunterzuladen!',
          slug: 'darum-solltest-du-game-of-thrones-kaufen',
          picture: 'darum-serien-kaufen.jpg',
          alt: 'Darum solltest Du Serien kaufen!',
          attribution: 'Stefan Schreier',
        },
        {
          slug: 'findet-dorie-rezension',
          picture: 'mircoohl_findet_dorie.jpg',
          alt: 'you see nothing',
          attribution: '',
          headline: 'Rezension - Findet Dorie',
          subline: 'Frische Gedanken zum Film',
        },
        {
          alt: 'Kritik Tote Mädchen lügen nicht',
          attribution: 'unsplash.com / Xavier Sotomayor',
          headline: 'Kritik zu Tote Mädchen lügen nicht',
          subline:
            'Warum die Netflix-Serie schlecht und gleichzeitig großartig ist!',
          slug: 'kritik-zu-tote-maedchen-luegen-nicht',
          picture: 'tote-maedchen-luegen-nicht-160417.jpg',
        },
        {
          alt:
            'Mia und Sebastian versuchen, in Los Angeles das große Glück zu finden.',
          attribution: '© Studiocanal',
          headline: 'Vom Mut zu Träumen',
          subline:
            'Ein Meisterwerk: Mit großartigen Schauspielern und einem Soundtrack zum Dahinschmelzen erzählt „La La Land“ von Hoffnungen und zerbrochenen Träumen.',
          slug: 'la-la-land-rezension-vom-mut-zu-traeumen',
          picture: 'lalaland-1-20170125.jpg',
        },
        {
          headline: 'Mit Außerirdischen sprechen',
          subline:
            'Bei dem Versuch, Außerirdische zu verstehen, entdeckt Amy Adams in Arrival die Macht von Sprache und Kommunikation.',
          slug: 'rezension-arrival-mit-ausserirdischen-sprechen',
          picture: 'arrival-2016-12-02.jpg',
          alt:
            'Die Linguistin Louise Banks (Amy Adams) nimmt im Raumschiff Kontakt zu den Außerirdischen auf.',
          attribution: '© Sony Pictures Releasing GmbH',
        },
      ],
      collection: 'Fernsehen',
    },
    {
      articles: [
        {
          headline: 'Ultimatives Käsekuchenrezept',
          subline:
            'Mit diesem Rezept findet garantiert jede Single-Frau einen Mann!',
          slug: 'bestes-kaesekuchen-rezept',
          picture: 'bester-kaesekuchen-rezept.jpg',
          alt: 'hier ist Käsekuchen zu sehen',
          attribution: 'Sabrina Kolba',
        },
        {
          slug: 'sadfasdfasdfasdf',
          picture: '',
          alt: 'asdfasdf',
          attribution: 'asdfasdfadsf',
          headline: 'asdfasdfasdf',
          subline: 'asdfasdfasdf',
        },
      ],
      collection: 'Essen',
    },
    {
      articles: [
        {
          headline: 'sadf',
          subline: 'asdf',
          slug: 'asdfasdf',
          picture: 'asdfadsf',
          alt: 'asdfasdf',
          attribution: 'asdfasdf',
        },
        {
          subline: 'asdfasdf',
          slug: 'asdfasdfasdfasdf',
          picture: '',
          alt: 'asdf',
          attribution: 'asdfasdf',
          headline: 'asdfasdf',
        },
        {
          alt: 'Hört endlich auf, euren Hund wie ein Kind zu behandeln!',
          attribution: 'unsplash.com / Simone Dalmeri',
          headline: 'Hört endlich auf, euren Hund wie ein Kind zu behandeln!',
          subline:
            'Und leckt um Himmels Willen nicht von der selben Kugel Eis!',
          slug: 'hunde-wie-kinder-behandeln',
          picture: '161108_hund.jpg',
        },
        {
          slug: 'qwer-qwer-qwer-qwer',
          picture: '',
          alt: 'qwer',
          attribution: 'qwer',
          headline: 'qwer',
          subline: 'qwerqewr',
        },
        {
          alt: 'Once im Vergleich zu Tinder',
          attribution: 'getonce.com / Pressebild',
          headline: 'Meine Erfahrungen mit der Dating-App Once',
          subline:
            'Warum die Idee dahinter gut, aber Tinder trotzdem besser ist!',
          slug: 'vorteile-von-once-gegenueber-tinder',
          picture: '161107_once_titel.jpg',
        },
      ],
      collection: 'Herz',
    },
    {
      articles: [
        {
          alt: 'Charly beißt in den Finger seines Bruders',
          attribution: 'CC BY 2.0 - Geoffrey Fairchild',
          headline: 'Charlie beißt in den Finger seines Bruders',
          subline: 'Und jeder Mensch mit Geschwistern kennt die Situation',
          slug: 'erfolgreicher-als-jedes-katzenvideo',
          picture: 'charly-bit-my-finger-20161021.jpg',
        },
      ],
      collection: 'Lustig',
    },
    {
      articles: [
        {
          headline: '10 Songs, die Du gehört haben musst, bevor Du stirbst!',
          subline: 'Vom "Lied der Erlösung" bis zum "Hallelujah"',
          slug: '10-songs-die-du-gehoert-haben-musst-bevor-du-stirbst',
          picture: 'schallplatten-bob-marley-the-beatles-20161027.jpg',
          alt: 'Schallplatten von Bob Marley und den Beatles',
          attribution: 'Kevin Baumann',
        },
        {
          headline: 'TODO',
          subline: 'TODO',
          slug: 'besten-deutsch-rap-posse-cuts',
          picture: 'charly-bit-my-finger-20161021.jpg',
          alt: 'TODO',
          attribution: '',
        },
        {
          alt: 'TODO',
          attribution: '',
          headline: 'TODO',
          subline: 'TODO',
          slug: 'mega-man-retrospektive',
          picture: 'charly-bit-my-finger-20161021.jpg',
        },
        {
          slug: 'qwer-qwer-qwer',
          picture: 'kassettenrekorder-20161124.jpg',
          alt: '',
          attribution: '',
          headline: 'qwerqwerqwe',
          subline: 'yxcvxcv',
        },
      ],
      collection: 'Musik',
    },
    {
      articles: [
        {
          alt: 'Flow-Chart der dir der Auswahl deines Studiums hilft probieren',
          attribution: '',
          headline: 'In fünf Minuten zum perfekten Studiengang',
          subline: 'Finde deine Begabung',
          slug: 'was-soll-ich-studieren',
          picture: 'flow-chart-emoji-20161124.jpg',
        },
      ],
      collection: 'Studium',
    },
    {
      articles: [
        {
          slug: 'zeitreise-in-die-achtziger-jahre',
          picture: 'kassetten-20161124.jpg',
          alt: 'Kassetten',
          attribution: '',
          headline: 'Das hattest du in den Achtzigern besser griffbereit',
          subline:
            'Eine Liste an Gegenständen, die mal unsere größten Schätze waren',
        },
      ],
      collection: 'Nostalgie',
    },
    {
      articles: [
        {
          alt: 'Überlebst Du eine Atombombenexplosion in Deiner Stadt?',
          attribution: 'unsplash.com / Dawn Arnfield',
          headline: 'Diese Karte zeigt Dir, ob Du eine Atombombe überlebst!',
          subline: 'Wirst Du direkt verdampfen oder verbrennst Du qualvoll?',
          slug: 'ueberlebst-du-wenn-eine-atombombe-explodiert',
          picture: '161111_explosion.jpg',
        },
        {
          headline: 'Handys sind primitive Technologie',
          subline: 'Eine Zeitreise zu deinem Ur-Opa',
          slug: 'wie-urmenschen-das-smartphone-erfunden-haben',
          picture: 'platzhalter.png',
          alt: '',
          attribution: 'CC BY 2.0 -',
        },
      ],
      collection: 'Technologie',
    },
    {
      articles: [
        {
          slug: 'rundreise-durch-kalifornien-auf-pacific-coast-highway-one',
          picture: 'carmel-by-the-sea-01.jpg',
          alt: 'Carmel by the Sea',
          attribution: '',
          headline: 'Auf dieser Traumstraße Amerikas ist der Weg das Ziel',
          subline: 'Reisebericht vom Highway One an der US Westküste',
        },
      ],
      collection: 'Reisen',
    },
    {
      articles: [
        {
          alt: 'Ein Honigdachs, dem alles egal ist',
          attribution: 'CC BY 2.0 - Anup Shah',
          headline: 'Warum der Honigdachs ein cooles Tier ist',
          subline: 'Ihm ist einfach alles egal',
          slug: 'honigdachse-sind-die-besseren-menschen',
          picture: 'honey-badger-20160122.jpg',
        },
      ],
      collection: 'Natur',
    },
    {
      articles: [
        {
          subline:
            'Immer schneller, immer billiger? In Zeiten von Fast Fashion fordert die Bewegung Fashion Revolution mehr Transparenz, Fairness und Nachhaltigkeit in der Modeindustrie.',
          slug: 'fashion-revolution-week-2017-who-made-my-clothes',
          picture: 'fashion-revolution-week-2017-04-23.jpg',
          alt:
            'Mehr Transparenz in der Fashionindustrie ist das Ziel der Fashion Revolution Week.',
          attribution: 'Nina Noodt',
          headline: 'Die Moderevolution',
        },
        {
          subline: 'Horrorbilder durch künstliche Intelligenz',
          slug: 'gruselige-bilder-mit-deep-learning',
          picture: 'taj-mahal-horror-20161124.jpg',
          alt: 'Taj Mahal als Horrorvision per Deep Learning',
          attribution: 'CC BY-NC 2.0 Louis Vest',
          headline: 'So sieht es aus, wenn ein Computer Alpträume hat',
        },
        {
          alt: 'Der Widerstand gegen Trump wächst.',
          attribution: '',
          headline: 'Wie man sich gegen Trump wehrt',
          subline:
            'Im April starten Studierende der Harvard-Universität einen Widerstandskurs gegen die Trump-Regierung. Jeder kann teilnehmen.',
          slug: 'resistance-school-harvard-grabs-back',
          picture: 'resistance-school-2017-04-04.jpg',
        },
      ],
      collection: 'Zukunft',
    },
    {
      articles: [
        {
          slug: 'analsex-lieben-lernen',
          picture: 'analsex-lieben-lernen-20161102.jpg',
          alt: 'Po in sexy Lingerie',
          attribution: 'CC BY-NC-ND 2.0 Frederic Dewulf',
          headline: 'Analsex lieben lernen',
          subline: 'Eine Einführung in die abenteuerliche Welt des Analsex',
        },
      ],
      collection: 'Sex',
    },
    {
      articles: [
        {
          subline: 'Beim Groundhopping schlagen Fanherzen höher',
          slug: 'groundhopping-fussball-stadion',
          picture: 'groundblogging_2.jpg',
          alt: 'Fußballstadion',
          attribution: '',
          headline: 'Da riecht es einfach nach Fußballgeschichte',
        },
        {
          headline: 'Die beste Sportart der Welt',
          subline: 'Völkerball wird total unterschätzt',
          slug: 'voelkerball-ist-die-beste-sportart-der-welt',
          picture: 'dodgeball-20160911.jpg',
          alt: 'Völkerball',
          attribution: '',
        },
      ],
      collection: 'Sport',
    },
    {
      articles: [
        {
          headline: 'Die beste Konsole ALLER Zeiten',
          subline:
            'Warum Nintendo mit dem NES-Reboot doch einen Fehler gemacht hat',
          slug: 'nes-erfolgreicher-als-nintendo-switch',
          picture:
            'nes-nintendo-classic-mini-nintendo-entertainment-system-20161112.jpg',
          alt: 'Nintendo Classic Mini Nintendo Entertainment System -',
          attribution: 'Nintendo of Europe',
        },
      ],
      collection: 'Games',
    },
  ],
};
