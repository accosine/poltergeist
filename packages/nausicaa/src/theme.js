const collections = {
  /* COLLECTION COLORS*/
  tv: {
    color: '#4DA1CB',
    subline: '#00A7FF',
    verlauf: '#00ADFF, #FF6500',
    transparent: 'rgba(0, 167, 255, 0.5)',
  },

  essen: {
    color: '#CB974D',
    subline: '#FFAA00',
    verlauf: '#FF5200, #FFC300',
    transparent: 'rgba(255, 170, 0, 0.7)',
  },

  herz: {
    color: '#CB4D77',
    subline: '#FF0000',
    verlauf: '#FF0000, #FF009E',
    transparent: 'rgba(255,0,0,0.7)',
  },

  lustig: {
    color: '#CB4DB6',
    subline: '#FFB600',
    verlauf: '#FB00FF, #FFDB00',
    transparent: 'rgba(255, 182, 0, 0.7)',
  },

  musik: {
    color: '#CBC14D',
    subline: '#ECE00C',
    verlauf: '#63BF44, #FF5900',
    transparent: 'rgba(236,224,12,0.8)',
  },

  studium: {
    color: '#774DCB',
    subline: '#7F00FF',
    verlauf: '#0D00FF, #FF2800',
    transparent: 'rgba(127, 0, 255, 0.7)',
  },
  technologie: {
    color: '#4DCBB6',
    subline: '#00FFB2',
    verlauf: '#C000FF, #00FF3E',
    // technologiezitat: '#68c0ac, #327f6e', // TODO: used?
    transparent: 'rgba(0, 255, 178, 0.5)',
  },
  natur: {
    color: '#77CB4D',
    subline: '#00FF54',
    verlauf: '#FFF700, #FF4D00',
    transparent: 'rgba(0, 255, 84, 0.5)',
  },
  zukunft: {
    color: '#4D6DCB',
    subline: '#00B3FF',
    verlauf: '#3300FF, #00FF6D',
    transparent: 'rgba(0, 179, 255, 0.7)',
  },
  reisen: {
    color: '#FF0059',
    subline: '#CB4D79',
    verlauf: '#30f, #FF0000',
    transparent: 'rgba(203,77,121,0.7)',
  },
  sex: {
    color: '#CB4DA1',
    subline: '#FF0070',
    verlauf: '#FF0000, #DF00FF',
    transparent: 'rgba(255, 0, 112, 0.7)',
  },
  sport: {
    color: '#4dAECB',
    subline: '#00B3FF',
    verlauf: '#3300FF, #FFD400',
    transparent: 'rgba(0, 179, 255, 0.7)',
  },
  nostalgie: {
    subline: '#332828',
    transparent: 'rgba(51, 40, 40, 0.7)',
    verlauf: '#333, #000',
  },
};

const theme = {
  /* NAUSICAA */
  nausikamint: '#92EFE5',
  nausikabubblesolid: 'rgba(255,255,255,0.7)',

  /* KONTRASTE */
  mausgrau: '#585252',
  hellgrau: '#C1C1C1',
  dunkelgrau: '#333333',
  grau: '#969696',
  eierschale: '#F9FAFB',
  black: '#000000',

  /* TRANSPARENZEN */
  transparent: 'rgba(255, 255, 255, 0)',
  weißtransparent: 'rgba(255,255,255,0.64)',
  dunkelgrautransparent1: 'rgba(0,0,0,0.1)',
  dunkelgrautransparent2: 'rgba(53,47,47,0.1)',
  dunkelgrautransparent3: 'rgba(0,0,0,0.8)',

  /* SOCIAL MEDIA */
  facebookblau: '#3C3CDE',
  twitterblau: '#8FD6EC',
  whatsappgruen: '#06C34B',

  /* VARIABLEN */
  drehungverlauf: '135deg',

  collection: collection => {
    if (collections[collection]) {
      return collections[collection];
    } else {
      return {
        color: '#4DA1CB',
        subline: '#00A7FF',
        verlauf: '#00ADFF, #FF6500',
        transparent: 'rgba(0, 167, 255, 0.5)',
      };
    }
  },
};

export default theme;
