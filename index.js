require('babel-register');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./src/server/router/user.route.js');
const db = require('./src/server/models');

const app = express();

// // if (process.env.NODE_ENV === 'development') {
const webpack = require('webpack');
const config = require('./webpack.dev.config.js');

const compiler = webpack(config);
app.use(
  require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  })
);
app.use(require('webpack-hot-middleware')(compiler));
// // }
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', routes);

// app.use('/assets', express.static(path.resolve(__dirname, 'assets')));
app.use(express.static('assets'));
app.use(express.static('media'));

// start the server
app.listen(process.env.PORT || 3000);

const initialState = {
  loginFlag: false,
  data: []
};

// SSR function import
const ssr = require('./src/server/ssr/server');
const template = require('./src/server/ssr/template');

// server rendered home page
app.get('*', (req, res) => {
  const { preloadedState, content } = ssr(req, initialState);
  const response = template('Server Rendered Page', preloadedState, content);
  res.setHeader('Cache-Control', 'assets, max-age=604800');
  res.send(response);
});

// tiny trick to stop server during local development
app.get('/exit', (req, res) => {
  if (process.env.PORT) {
    res.send('Sorry, the server denies your request');
  } else {
    res.send('shutting down');
    process.exit(0);
  }
});
