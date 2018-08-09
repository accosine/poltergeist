import React, { createContext } from 'react';

const { Provider, Consumer } = createContext({});

const withConfig = Component => props => (
  <Consumer>{data => <Component {...props} config={data} />}</Consumer>
);

export { Consumer as ConfigConsumer, Provider as ConfigProvider, withConfig };
