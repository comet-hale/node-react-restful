const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./src/server/router/user.route.js');
const db = require('./src/server/models');
const ssr = require('./src/server/ssr/ssr.index');

const app = express();

// if (process.env.NODE_ENV === 'development') {
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
// }

app.use(express.static('assets'));
app.use(express.static('media'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', routes);
app.use('*', ssr); // serverside rendering

// start the server
app.listen(process.env.PORT || 3000);
