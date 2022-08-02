const server = require('express')();
const renderer = require('vue-server-renderer').createRenderer();
const createApp = require('../dist/js/server.145b8063');

server.get('*', (req, res) => {
  const context = {
    url: req.url,
  };
  const app = createApp(context);

  renderer.renderToString(app, (err, html) => {
    if (err) {
      if (err.code === 404) {
        res.status(404).end('Page not found');
      } else {
        res.status(500).end('Internal Server Error');
      }
    } else {
      res.end(html);
    }
  });
});

server.listen(8080);
