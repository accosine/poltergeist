import React, { createElement } from 'react';
import config from '../config';
import marksy from 'marksy';
import Shortcodes from '../util/shortcodes';

import { storiesOf } from '@storybook/react';
import { linkTo } from '@storybook/addon-links';
import { withInfo } from '@storybook/addon-info';

import MarkdownComponents from '../components/MarkdownComponents';
import Publication from '../components/Publication';
import Portal from '../components/Portal';
import Pager from '../components/Portal/Pager';
import Listing from '../components/Portal/Listing';
import Footer from '../components/Footer';
import Start from '../components/Start';
import AdContainer from '../components/AdContainer';

import { publicationProps, startProps, portalProps } from './fixtures';

const compile = marksy({
  createElement,
  elements: MarkdownComponents,
});

storiesOf('Components', module)
  .add(
    'AdContainer',
    withInfo(
      `The adconfig prop object's entries are added to the amp-ad tag as attributes.`
    )(() => (
      <AdContainer
        width={300}
        height={250}
        adnetwork="a9"
        adconfig={{
          'data-aax_size': '300x250',
          'data-aax_pubname': 'test123',
          'data-aax_src': '302',
        }}
      />
    ))
  )
  .add('Pager', () => (
    <Pager
      currentPage={1}
      pagerSize={3}
      articleCount={7}
      collection="Fernsehen"
      config={config}
    />
  ))
  .add('Listing', () => <Listing config={config} {...portalProps} />)
  .add('Footer', () => <Footer config={config} />);

storiesOf('Pages', module)
  .add('Publication', props => {
    const shortcodes = Shortcodes(config);
    const { text } = shortcodes(
      publicationProps.frontmatter.content,
      props.styletron
    );
    const { tree: articleTree } = compile(
      text,
      { sanitize: false },
      { collection: publicationProps.frontmatter.collection }
    );
    return (
      <Publication
        config={config}
        article={articleTree}
        {...publicationProps}
      />
    );
  })
  .add('Portal', () => <Portal config={config} {...portalProps} />)
  .add('Start', () => <Start config={config} {...startProps} />);
