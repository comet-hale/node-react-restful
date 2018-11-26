import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import configureStore from '../../client/redux/configureStore';
import { StaticRouter } from 'react-router-dom';
import App from '../../client/app';

module.exports = function render(req, initialState) {
  const store = configureStore(initialState);
  const context = {};
  let content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    </Provider>
  );
  const preloadedState = store.getState();
  return { content, preloadedState };
};
