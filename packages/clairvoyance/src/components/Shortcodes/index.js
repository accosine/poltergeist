import React, { memo } from 'react';
import { makeStyles } from '@material-ui/styles';

import Shortcode, { TextInput, Switch, Text } from './Shortcode';
import YouTube from './YouTube';
import SoundCloud from './SoundCloud';
import Vimeo from './Vimeo';
import Instagram from './Instagram';
import Gfycat from './Gfycat';
import FitText from './FitText';
import FacebookComments from './Facebook/Comments';
import FacebookPost from './Facebook/Post';
import Pinterest from './Pinterest';
import Twitter from './Twitter';
import Playbuzz from './Playbuzz';
import Iframe from './Iframe';
import Img from './Img';

import plugins from '../../plugins';

// import Accordion from './Accordion';
// import Carousel from './Carousel';
// import Lightbox from './Lightbox';
// import ImageLightbox from './ImageLightbox';
// import AppBanner from './AppBanner';
//
const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    padding: theme.spacing.unit + 'px 0',
  },
}));

const Shortcodes = ({ onShortcode }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Img onShortcode={onShortcode} />
      {plugins
        .filter(plugin => plugin.shortcode)
        .map(({ shortcode }) => {
          const { dialog, name, label, title } = shortcode;
          const { Content, onInsert, isValid } = dialog({
            TextInput,
            Switch,
            Text,
          });
          return (
            <Shortcode
              key={name}
              onShortcode={onShortcode}
              label={label}
              title={title}
              Content={Content}
              onInsert={onInsert}
              isValid={isValid}
            />
          );
        })}
      <YouTube onShortcode={onShortcode} />
      <SoundCloud onShortcode={onShortcode} />
      <Vimeo onShortcode={onShortcode} />
      <Instagram onShortcode={onShortcode} />
      <Gfycat onShortcode={onShortcode} />
      <FacebookComments onShortcode={onShortcode} />
      <FacebookPost onShortcode={onShortcode} />
      <Pinterest onShortcode={onShortcode} />
      <Playbuzz onShortcode={onShortcode} />
      <Twitter onShortcode={onShortcode} />
      <Iframe onShortcode={onShortcode} />
      <FitText onShortcode={onShortcode} />
      {/*
      <AppBanner onShortcode={onShortcode} />
      */}
      {/*
      <Lightbox onShortcode={onShortcode} />
      */}
      {/*
      <ImageLightbox onShortcode={onShortcode} />
      */}
      {/*
      <Accordion onShortcode={onShortcode} />
      */}
      {/*
      <Carousel onShortcode={onShortcode} />
      */}
    </div>
  );
};

export default memo(Shortcodes);
