const fs = require('fs');
const path = require('path');
const express = require('express');
const server = express();
const { createBundleRenderer } = require('vue-server-renderer');
const isProd = process.env.NODE_ENV === 'production';
const templatePath = path.resolve(__dirname, './src/index.template.html');

let renderer;
let readyPromise;
const createRenderer = function (bundle, { template, clientManifest }) {
  return createBundleRenderer(bundle, {
    template,
    clientManifest,
    runInNewContext: false,
  });
};
if (isProd) {
  const template = fs.readFileSync(templatePath, 'utf-8');
  const bundle = require('./dist/vue-ssr-server-bundle.json');
  const clientManifest = require('./dist/vue-ssr-client-manifest.json');
  renderer = createRenderer(bundle, {
    template,
    clientManifest,
  });
} else {
  readyPromise = require('./build/setup-dev-server')(
    server,
    templatePath,
    (bundle, options) => {
      renderer = createRenderer(bundle, options);
    }
  );
}

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

server.get(
  '*',
  isProd
    ? render
    : (req, res) => {
        console.log('in server');
        readyPromise.then(() => {
          render(req, res);
        });
      }
);

server.listen(8088, function () {
  console.log('server listen on 8088');
});
