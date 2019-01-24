const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    client: './src/client/client.js'
  },
  output: {
    path: path.resolve(__dirname, 'assets'),
    filename: '[name].js',
    publicPath: '/'
  },
  target: 'web',
  plugins: [new ExtractTextPlugin({ filename: 'style.css', allChunks: true })],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      },
      {
        test: /\.css|scss$/,
        loader: ExtractTextPlugin.extract('css-loader!sass-loader')
      }
    ]
  }
};
