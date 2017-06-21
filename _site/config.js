var CONFIG = {
  // your website's title
  document_title: "idoc-template",
  // your website's url
  site_url: "http://shenbao.github.io/idoc-template",
  // index page
  index: "README.md",
  // sidebar file
  sidebar_file: "sidebar.md",
  // github pro name
  base_url: "http://github.com/xx/xx/edit/gh-pages",
  // github url 
  github_url: "http://github.com/ShenBao/idoc-template",
  // disqus Setting
  disqus_username: "ShenBao",
  // hypercomments Setting
  hypercomments_userid: 91931
};

// **************************
// DON'T EDIT FOLLOWING CODES
// **************************

addConfig(ditto, CONFIG);

function addConfig(obj, conf) {
  Object.keys(conf).forEach(function (key) {
    obj[key] = conf[key];
  });
}

