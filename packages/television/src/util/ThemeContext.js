import React, { createContext } from 'react';

const { Provider, Consumer } = createContext({});

const withTheme = Component => ({ context, ...props }) => (
  <Consumer>
    {data => <Component {...props} $context={context} $theme={data} />}
  </Consumer>
);

export { Consumer as ThemeConsumer, Provider as ThemeProvider, withTheme };
