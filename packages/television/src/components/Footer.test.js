import React from 'react';
import renderer from 'react-test-renderer';
import { Provider as StyletronProvider } from 'styletron-react';
import { Server as StyletronServer } from 'styletron-engine-atomic';
import { ThemeProvider } from '../util/ThemeContext';

import { config } from '../fixtures';
import colors from '../colors.js';
import Footer from './Footer';

jest.mock('styletron-react', () => {
  const React = require.requireActual('react');
  const originalStyletron = require.requireActual('styletron-react');
  return {
    ...originalStyletron,
    styled: (name, stylesCreator) => {
      return props =>
        React.createElement(name, {
          ...Object.keys(props).reduce((acc, k) => {
            if (k[0] === '$') {
              acc[`data-styleprop-${k.substr(1)}`] = props[k];
            } else {
              acc[k] = props[k];
            }
            return acc;
          }, {}),
          'data-style':
            typeof stylesCreator === 'function'
              ? stylesCreator(props)
              : stylesCreator,
        });
    },
  };
});

test('Link changes the class when hovered', () => {
  const styletron = new StyletronServer();
  const component = renderer.create(
    <StyletronProvider value={styletron}>
      <ThemeProvider value={colors}>
        <Footer styletron={styletron} config={config.application} />
      </ThemeProvider>
    </StyletronProvider>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
