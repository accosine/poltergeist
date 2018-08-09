import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import Styletron from 'styletron-client';
import { withInfo, setDefaults } from '@storybook/addon-info';
import { StyletronProvider } from 'styletron-react';
import ThemeProvider from '../src/util/ThemeProvider';

import theme from '../src/theme.js';

setDefaults({
  inline: true,
});

addDecorator(story => {
  const styletron = new Styletron();
  return (
    <StyletronProvider styletron={styletron}>
      <ThemeProvider theme={theme}>
        {React.cloneElement(story(), { styletron })}
      </ThemeProvider>
    </StyletronProvider>
  );
});

// automatically import all files ending in *.stories.js
const req = require.context('../src/stories', true, /.stories.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
