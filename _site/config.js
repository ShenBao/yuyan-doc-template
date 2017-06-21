var CONFIG = {
  // your website's title
  document_title: "idoc-template",

  // index page
  index: "README.md",

  // sidebar file
  sidebar_file: "sidebar.md",

  // where the docs are actually stored on github - so you can edit
  base_url: "http://github.com/xx/xx/edit/gh-pages",

  site_url: "http://shenbao.github.io/idoc-template",

  github_url: "http://github.com/ShenBao/idoc-template",

  disqus_username: "ShenBao",

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

