const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
// const webpackHotMiddleware = require('webpack-hot-middleware');

module.exports = {
  entry: ['webpack-hot-middleware/client', './src/client/client.js'],
  output: {
    path: path.resolve(__dirname, 'assets'),
    filename: 'client.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js']
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin({ filename: 'style.css', allChunks: true })
  ],
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css-loader!sass-loader')
      }
    ]
  }
};
