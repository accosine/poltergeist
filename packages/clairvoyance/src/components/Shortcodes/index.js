import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Shortcode, { TextInput, Switch, Text } from './Shortcode';
import Youtube from './Youtube';
import Soundcloud from './Soundcloud';
import Vimeo from './Vimeo';
import Instagram from './Instagram';
import Gfycat from './Gfycat';
import FitText from './FitText';
import FacebookComments from './FacebookComments';
import Facebook from './Facebook';
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

class Shortcodes extends PureComponent {
  render() {
    const { onShortcode } = this.props;

    return (
      <div>
        <Img onShortcode={onShortcode} />
        {plugins.filter(plugin => plugin.shortcode).map(({ shortcode }) => {
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
        <Youtube onShortcode={onShortcode} />
        <Soundcloud onShortcode={onShortcode} />
        <Vimeo onShortcode={onShortcode} />
        <Instagram onShortcode={onShortcode} />
        <Gfycat onShortcode={onShortcode} />
        <FitText onShortcode={onShortcode} />
        <FacebookComments onShortcode={onShortcode} />
        <Facebook onShortcode={onShortcode} />
        <Pinterest onShortcode={onShortcode} />
        <Playbuzz onShortcode={onShortcode} />
        <Twitter onShortcode={onShortcode} />
        <Iframe onShortcode={onShortcode} />
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
  }
}

Shortcodes.propTypes = {
  onShortcode: PropTypes.func.isRequired,
};

export default Shortcodes;
