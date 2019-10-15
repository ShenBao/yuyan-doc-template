'use strict';

const path = require('path');
const {merge} = require('webpack-merge');

const baseConfig = require('./webpack.base.config');
const {IndexHtmlWebpackPlugin, buildPageList} = require('./webpack.utils');

module.exports = merge(baseConfig, {
  devtool: 'cheap-module-eval-source-map',
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname),
    compress: true,
    port: 9000,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [IndexHtmlWebpackPlugin(buildPageList())],
});
