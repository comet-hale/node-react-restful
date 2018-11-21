const path = require('path');
const extractNodeExternals = require('webpack-node-externals');

module.exports = {
  context: __dirname,
  entry: {
    server: './index.js'
  },
  output: {
    path: path.resolve(__dirname, 'assets'),
    filename: '[name].js',
    publicPath: '/'
  },
  externals: [extractNodeExternals()],
  target: 'node',
  node: {
    __dirname: false,
    __filename: false
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
      }
    ]
  }
};
