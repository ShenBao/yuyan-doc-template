'use strict';

const {merge} = require('webpack-merge');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const baseConfig = require('./webpack.base.config');
const {IndexHtmlWebpackPlugin, buildPageList} = require('./webpack.utils');

module.exports = merge(baseConfig, {
  output: {
    publicPath: '/yuyan-doc-template/dist/',
  },
  devtool: 'hidden-source-map',
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(),
    IndexHtmlWebpackPlugin(buildPageList()),
    IndexHtmlWebpackPlugin(
      {
        ...buildPageList(),
        pageTitle: '----pageTitle----',
        yuyanDocConfig: '---YUYAN_DOC_CONFIG----',
      },
      true
    ),
  ],
});
