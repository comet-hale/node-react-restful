import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';
import { Router } from 'react-router-dom';

import createBrowserHistory from 'history/createBrowserHistory';
import App from './app/app';

import './sass/base.scss';
import { userConstants } from './redux/constants';
const History = createBrowserHistory();

const state = window.__STATE__;
delete window.__STATE__;
const store = configureStore(state);

hydrate(
  <Provider store={store}>
    <Router history={History}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
);
