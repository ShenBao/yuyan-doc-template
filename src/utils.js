import marked from 'marked';
import hljs from 'highlight.js';

const {contentType = 0} = window.YUYAN_DOC_CONFIG || {};

let renderer = new marked.Renderer();
marked.setOptions({
  renderer: renderer,
  highlight: function (code) {
    return hljs.highlightAuto(code).value;
  },
  pedantic: false,
  gfm: true,
  tables: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: true,
});

export const handlerContent = (content) => {
  let tmpContent = content;
  if (contentType === 0) {
    tmpContent = tmpContent.replace(/\.\.\/img/g, './img');
  }
  return marked(tmpContent);
};

export const getTitle = (content) => {
  let nav = [];

  let tempArr = [];
  content.replace(/(#+)[^#][^\n]*?(?:\n)/g, function (match, m1, m2) {
    let title = match.replace('\n', '');
    let level = m1.length;
    tempArr.push({
      title: title.replace(/^#+/, '').replace(/\([^)]*?\)/, ''),
      level: level,
      children: [],
    });
  });

  nav = tempArr.filter((item) => item.level <= 2);
  let index = 0;
  return (nav = nav.map((item) => {
    item.index = index++;
    return item;
  }));
};
