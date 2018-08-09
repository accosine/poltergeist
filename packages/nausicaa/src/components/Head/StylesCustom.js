import React from 'react';

export default ({ styles, theme }) => (
  <style
    amp-custom=""
    dangerouslySetInnerHTML={{
      __html:
        styles +
        ` ::selection { background: ${
          theme.nausikamint
        }; } .amp-carousel-slide img { object-fit: contain; } figure { margin: 0; }`,
    }}
  />
);
