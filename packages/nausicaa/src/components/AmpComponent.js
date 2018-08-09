import React from 'react';
export default Element => ({ className, theme, ...props }) => (
  <Element class={className} {...props} />
);
