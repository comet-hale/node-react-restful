require('babel-register');

const initialState = {
  loginFlag: false,
  data: []
};

// SSR function import
const serverRender = require('./server.render');
const template = require('./template');

// server rendered home page
const ssr = (req, res) => {
  const { preloadedState, content } = serverRender(req, initialState);
  const response = template('Server Rendered Page', preloadedState, content);
  res.setHeader('Cache-Control', 'assets, max-age=604800');
  res.send(response);
};

module.exports = ssr;
