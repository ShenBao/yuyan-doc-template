'use strict';

const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader?cacheDirectory'],
        include: path.resolve(__dirname, 'src'),
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: __dirname + '/src/static',
          to: __dirname + '/dist/static',
        },
        {
          from: __dirname + '/src/js',
          to: __dirname + '/dist/js',
        },
        {
          from: __dirname + '/src/images',
          to: __dirname + '/dist/images',
        },
      ],
    }),
    new HardSourceWebpackPlugin(),
  ],
  performance: {
    hints: 'warning',
    assetFilter: function (assetFilename) {
      return assetFilename.endsWith('.js');
    },
  },
  resolve: {
    alias: {
      '@lib': path.resolve(__dirname, 'src/lib'),
    },
  },
};
