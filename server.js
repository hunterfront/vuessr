const path = require('path');
const express = require('express');
const server = express();
const { createBundleRenderer } = require('vue-server-renderer');
const setupDevServer = require('./setup-dev-server');
// const serverBundle = require('./dist/vue-ssr-server-bundle.json');
// const clientManifest = require('./dist/vue-ssr-client-manifest.json');
// const template = require('fs').readFileSync('./index.template.html', 'utf-8');
// const resolve = (file) => path.resolve(__dirname, file);
const templatePath = path.resolve(__dirname, './index.template.html');

let renderer;

const createRenderer = function (bundle, { template, clientManifest }) {
  renderer = createBundleRenderer(bundle, {
    template,
    clientManifest,
    runInNewContext: false,
  });
};

const readyPromise = setupDevServer(server, templatePath, createRenderer);
server.use('/', express.static('./dist'));

const render = (req, res) => {
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
      res.end(html);
    }
  });
};

server.get('*', (req, res) => {
  console.log('in server');
  readyPromise.then(() => {
    render(req, res);
  });
});

server.listen(8088, function () {
  console.log('server listen on 8088');
});
