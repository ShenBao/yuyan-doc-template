import React from 'react';
import './style.scss';

const config = [
  {
    title: 'Author Email',
    url: 'shenbaoone@gmail.com',
  },
  {
    title: 'GitHub',
    url: 'https://github.com/ShenBao',
  },
  {
    title: 'Blog',
    url: 'https://shenbao.github.io',
  },
];

export default () => {
  return (
    <div className="footer">
      <p>
        本文链接：https://shenbao.github.io{location.pathname}
        {location.hash}
      </p>
      <p>版权声明: 可以随意转发，请保留署名及原文链接</p>
      <p>Copyright 2016 - Present © https://shenbao.github.io</p>
      {config.map((item) => {
        return (
          <p key={item.url}>
            {item.title}： {item.url}
          </p>
        );
      })}
    </div>
  );
};
