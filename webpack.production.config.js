'use strict';

const {merge} = require('webpack-merge');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const baseConfig = require('./webpack.base.config');
const {IndexHtmlWebpackPlugin, buildPageList} = require('./webpack.utils');

module.exports = merge(baseConfig, {
  output: {
    publicPath: '/yuyan-doc-template/dist/',
  },
  devtool: 'none',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader,  'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
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
  optimization: {
    splitChunks: {
      cacheGroups: {
        react: {
          test: /(react|react-dom)/,
          name: 'react',
          chunks: 'all',
        },
        highlight: {
          test: /(highlight.js)/,
          name: 'highlight',
          chunks: 'all',
        },
      },
    },
  },
});
