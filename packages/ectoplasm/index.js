const admin = require('firebase-admin');
const express = require('express');
const cookieParser = require('cookie-parser')();
const cors = require('cors')({ origin: true });

const ectoplasm = config => {
  const app = express();
  const { Theme, Fetcher } = require(config.application.theme);

  const fetcher = Fetcher(config.application);
  const plugins = (config.application.plugins || []).map(plugin =>
    require(plugin)
  );
  const theme = Theme(
    config.application,
    // {
    // ...functions.config().application,
    // ...(process.env.NODE_ENV !== 'production'
    //   ? {
    //       basename: `/${process.env.GCLOUD_PROJECT}/us-central1/${
    //         process.env.FUNCTION_NAME
    //       }`,
    //     }
    //   : {}),
    // },
    plugins
  );

  admin.initializeApp();

  const collections = config.application.article.collections;
  const caching = config.application.caching;
  const noindex = config.application.noindex;

  const firestore = admin.firestore();
  const articles = firestore.collection('articles');
  const pages = firestore.collection('pages');

  app.use(cors);
  app.use((req, res, next) => {
    if (req.url !== '/' && req.url.endsWith('/')) {
      return res.redirect(301, req.url.slice(0, -1));
    }
    res.set(
      'Cache-Control',
      `public, max-age=${caching.maxage}, s-maxage=${caching.servermaxage}`
    );
    next();
  });
  app.use(cookieParser);

  app.get('/robots.txt', (req, res) => {
    res.type('text/plain');
    res.send(`User-agent: *\nDisallow:${noindex === 'true' ? ' /' : ''}`);
  });

  // TODO: make double digits work
  const paginationRegex = ':page([2-9]|[1-9]\\d*)';

  app.get(`/(${paginationRegex})?`, (req, res) => {
    fetcher
      .start(articles, req.params.page || 1)
      .then(data => res.send(theme.start(data)))
      .catch(err => {
        console.error(err);
        res.status(500).send(err);
      });
  });

  Object.keys(collections).forEach(collection => {
    const collectionPath = collections[collection].slug;

    app.get(`/${collectionPath}(/${paginationRegex})?`, (req, res) => {
      fetcher
        .portal(articles, collection, req.params.page || 1)
        .then(data => res.send(theme.portal(data)))
        .catch(err => {
          console.log(err);
          if (err.message === '404') {
            return res.status(404).send('Page not found');
          }
          res.status(500).send('Something broke!');
        });
    });

    app.get(`/${collectionPath}/:slug`, (req, res) => {
      fetcher
        .article(articles, req.params.slug, collection)
        .then(data => res.send(theme.article(data)))
        .catch(err => {
          console.log(err);
          if (err.message === '404') {
            return res.status(404).send('Page not found');
          }
          res.status(500).send('Something broke!');
        });
    });
  });

  app.get('/:page', (req, res) => {
    fetcher
      .page(pages, req.params.page)
      .then(data => res.send(theme.page(data)))
      .catch(err => {
        console.log(err);
        if (err.message === '404') {
          return res.status(404).send('Page not found');
        }
        res.status(500).send('Something broke!');
      });
  });

  return app;
};

module.exports = config => ectoplasm(config);
