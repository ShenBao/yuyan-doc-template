'use strict';

const fs = require('fs');

const {buildPageList} = require('./webpack.utils');

const config = buildPageList();

let tmpHtml = fs.readFileSync('./dist/template.html');
let tmp = tmpHtml.toString();

tmp = tmp
  .replace('----pageTitle----', 'YUYAN_DOC pageTitle')
  .replace('"---YUYAN_DOC_CONFIG----"', JSON.stringify(config.yuyanDocConfig));

let fd = fs.openSync('index.html', 'w');
fs.writeFileSync(fd, tmp);
fs.closeSync(fd);

console.info('index.html success ...');
