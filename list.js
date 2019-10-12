const path = require('path');
const glob = require('glob');
const mdFiles = glob.sync(path.join(__dirname, './ES*/*.md'));

const pageList = {};
const isDev = true;

Object.keys(mdFiles).map((index) => {
    const entryFile = mdFiles[index];
    const match = entryFile.match(/\/yuyan-doc-template\/(.*)\/*\.md/);
    if (!(match && match[0].endsWith('README.md'))) {
        // console.log(mdFiles[index]);
        // console.log(match);
        const arr = match[1].split('/');
        // console.log(arr);
        !pageList[arr[0]] ? pageList[arr[0]] = [] : '';
        pageList[arr[0]].push({
            title: arr[1],
            url: isDev ? match[0].replace('/yuyan-doc-template', '') : match[0]
        });
    }
});

console.log(pageList);
