'use strict';

const path = require('path');
const glob = require('glob');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

const CONFIG = {
  pageTitle: 'YuYan-Doc',
  templatePath: './src/index.html',
  yuyanDocConfig: {
    GITHUB_USERNAME: 'ShenBao',
    REPOSITORY_NAME: 'yuyan-doc-template',
    pageTitle: 'YuYan-Doc',
    templatePath: './src/index.html',
    pageList: [],
    pageMap: {},
    contentType: 0,
    isDev,
  },
};

const findIsIgnoreFile = (match) => {
  const filePath = match[0];
  return filePath.endsWith('README.md') || filePath.includes('node_modules');
};

const buildPageList = () => {
  const mdFiles = glob.sync(path.join(__dirname, './**/*.md'));
  const pageList = [];
  const pageMap = {};
  Object.keys(mdFiles).map((index) => {
    const entryFile = mdFiles[index];
    const match = entryFile.match(/\/yuyan-doc-template\/(.*)\/*\.md/);
    const isIgnoreFile = findIsIgnoreFile(match);
    if (!(match && isIgnoreFile)) {
      const arr = match[1].split('/');
      !pageMap[arr[0]] ? (pageMap[arr[0]] = []) : '';
      const item = {
        title: arr[1],
        url: isDev
          ? match[0].replace(`/${CONFIG.yuyanDocConfig.REPOSITORY_NAME}`, '')
          : match[0],
      };
      pageList.push(item);
      pageMap[arr[0]].push(item);
    }
  });

  CONFIG.yuyanDocConfig.pageList = pageList;
  CONFIG.yuyanDocConfig.pageMap = pageMap;
  return CONFIG;
};

const IndexHtmlWebpackPlugin = (CONFIG, isTmp) => {
  return new HtmlWebpackPlugin({
    title: CONFIG.pageTitle,
    template: CONFIG.templatePath,
    staticUrl: isDev ? './' : '/yuyan-doc-template/dist/',
    yuyanDocConfig: JSON.stringify(CONFIG.yuyanDocConfig),
    filename: isTmp ? 'template.html' : 'index.html',
    chunks: ['main'],
    minify: {
      html5: true,
      collapseWhitespace: true,
      preserveLineBreaks: false,
      minifyCSS: true,
      minifyJS: true,
      removeComments: false,
    },
  });
};

module.exports = {
  IndexHtmlWebpackPlugin,
  buildPageList,
};
