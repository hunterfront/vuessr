const path = require('path');
const express = require('express');
const server = express();
const { createBundleRenderer } = require('vue-server-renderer');
const serverBundle = require('./dist/vue-ssr-server-bundle.json');
const clientManifest = require('./dist/vue-ssr-client-manifest.json');
const resolve = (file) => path.resolve(__dirname, file);

const renderer = createBundleRenderer(serverBundle, {
  // template,
  clientManifest,
  runInNewContext: false,
  // basedir: resolve('./dist'),
});
// server.use('/dist', express.static('./dist'));

server.get('*', (req, res) => {
  const context = {
    url: req.url,
  };

  renderer.renderToString(context, (err, html) => {
    if (err) {
      if (err.code === 404) {
        res.status(404).end('Page not found');
      } else {
        res.status(500).end('Internal Server Error');
      }
    } else {
      res.end(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <title>Hello</title>
          <meta charset="utf-8" />
        </head>
        <body>${html}</body>
      </html>
    `);
    }
  });
});

server.listen(8088);
