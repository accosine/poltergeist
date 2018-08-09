const collections = {
  /* COLLECTION COLORS*/
  __default: {
    color: '#4DA1CB',
    invertcolor: '#ffffff',
    backgroundcolor: '#777777',
    border: '#585858',
    subline: '#ff5e00', // '#dd4814'
    gradient: '#00ADFF, #FF6500',
    transparent: 'rgba(0, 167, 255, 0.5)',
  },
};

const theme = {
  primary: '#FF6500',

  /* CONTRASTS */
  white: '#fff',
  grey: {
    100: '#F9FAFB',
    200: '#f1f1f1',
    400: '#C1C1C1',
    500: '#969696',
    700: '#585252',
    900: '#333333',
  },
  black: '#000000',

  /* TRANSPARENZEN */
  transparent: 'rgba(255, 255, 255, 0)',
  transparentwhite: 'rgba(255,255,255,0.64)',

  /* SOCIAL MEDIA */
  facebook: '#3C3CDE',
  twitter: '#8FD6EC',
  whatsapp: '#06C34B',
  snapchat: '#fffc00',
  instagram: 'url(#instagram-gradient)',
  github: '#24292e',
  email: 'rgb(211, 76, 66)',

  /* VARIABLEN */
  gradientrotation: '135deg',

  collection: collection => {
    if (collections[collection]) {
      return collections[collection];
    } else {
      return collections.__default;
    }
  },
};

export default theme;
