import React from 'react';
import { ConfigConsumer } from '../util/ConfigContext';

/* eslint-disable jsx-a11y/anchor-has-content */
const Link = ({ href, ...props }) => (
  <ConfigConsumer>
    {({ basename = '' }) => <a href={`${basename}${href}`} {...props} />}
  </ConfigConsumer>
);

export default Link;
