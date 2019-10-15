'use strict';

import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';

import 'normalize.css';
import './style.scss';
import 'highlight.js/styles/github-gist.css';

import {handlerContent, getTitle} from './utils';
import Footer from './components/Footer';

const {
  pageTitle = '',
  pageList = [],
  pageMap = {},
  GITHUB_USERNAME = 'ShenBao',
  REPOSITORY_NAME,
  isDev,
} = window.YUYAN_DOC_CONFIG || {};

window.emojify &&
  window.emojify.setConfig({
    emojify_tag_type: 'div',
    only_crawl_id: null,
    img_dir: isDev ? 'images/emoji' : '/yuyan-doc-template/dist/images/emoji',
    ignored_tags: {
      SCRIPT: 1,
      TEXTAREA: 1,
      A: 1,
      PRE: 1,
      CODE: 1,
    },
  });

function PageTool({url}) {
  let pagePath = url.replace(`/${REPOSITORY_NAME}`, '');
  return (
    <div className="page-tool">
      <a
        href={`https://github.com/${GITHUB_USERNAME}/${REPOSITORY_NAME}/blob/master${pagePath}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        编辑本页面
      </a>
    </div>
  );
}

function App() {
  const hash = (location.hash || '').split('#')[1] || '';
  const hashObj =
    pageList.find((item) => item.url === decodeURIComponent(hash)) || {};
  const [pageUrl, setPageUrl] = useState(hashObj.url || pageList[0].url);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const fetchMD = async () => {
    try {
      const {data = ''} = await axios.get(pageUrl);
      if (data) {
        setTitle(getTitle(data)[0]?.title);
        setContent(data);
      } else {
        setError('data is null');
      }
    } catch (error) {
      console.log(error);
      setError(JSON.stringify(error, null, 4));
    }
  };
  useEffect(() => {
    fetchMD();
  }, [pageUrl]);
  useEffect(() => {
    window.emojify && window.emojify.run();
  }, [content]);

  const handlerItem = (item) => {
    location.hash = item.url;
    setPageUrl(item.url);
    setTitle(item.title);
    setContent('');
    setError('');
  };

  const renderContent = handlerContent(content);
  return (
    <div className="app">
      <div className="topbar">
        {/* {
          <div className="sidebar-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
              viewBox="0 0 448 512"
              className="icon"
            >
              <path
                fill="currentColor"
                d="M436 124H12c-6.627 0-12-5.373-12-12V80c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12z"
              ></path>
            </svg>
          </div>
        } */}
        <h1>
          <a href="https://shenbao.github.io" target="_blank">
            {pageTitle}
          </a>
        </h1>
        <ul>
          <li>
            <a href="https://shenbao.github.io" target="_blank">
              Blog
            </a>
          </li>
          <li>
            <a href="https://github.com/ShenBao" target="_blank">
              GitHub
            </a>
          </li>
        </ul>
      </div>
      <div className="sidebar">
        {Object.keys(pageMap).map((key) => {
          return (
            <div key={key}>
              <h4>{key}</h4>
              <ul>
                {pageMap[key].map((item) => {
                  return (
                    <li
                      key={item.url}
                      className={pageUrl == item.url ? 'active' : ''}
                    >
                      <a title={item.title} onClick={() => handlerItem(item)}>
                        {item.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
      <div className="page-content" id="page-content">
        <h1>{title}</h1>
        {!content && !error && <div className="loading-wrap">Loading ...</div>}
        {error && (
          <div className="error-content">
            <h4>Request error message：</h4>
            <pre>{error}</pre>
          </div>
        )}
        <div
          className="render-content"
          dangerouslySetInnerHTML={{__html: renderContent}}
        />
        <Footer />
      </div>
      <PageTool url={pageUrl} />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
