const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./src/server/routes/user.route.js');
const db = require('./src/server/models');
const ssr = require('./src/server/ssr/ssr.index'); // serverside rendering

const app = express();
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';

console.log(dev);
if (dev) {
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
} else {
}

app.use(express.static('assets'));
app.use(express.static('media'));
app.use(express.static('upload'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', routes);
app.use('*', ssr); // serverside rendering

// start the server
app.listen(port, (err) => {
  if (err) throw err;
  console.log(`> Ready on http://localhost:${port}`);
});
