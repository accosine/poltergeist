import React from 'react';
import preval from 'preval.macro'

const spritemap = preval`
import { getSpritemapSync } from 'svg-spritemap';
module.exports = "'" + getSpritemapSync('src/logos', { withSvgTag: false }) + "'";
`;

export default () => {
  return (
    <svg
      width="0"
      height="0"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      dangerouslySetInnerHTML={{ __html: spritemap }}
    />
  );
};
