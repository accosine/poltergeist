import React from 'react';

export default ({ name }) =>
  <script
    async
    custom-element={`amp-${name}`}
    src={`https://cdn.ampproject.org/v0/amp-${name}-0.1.js`}
  />;
