const express = require('express');
const cookieParser = require('cookie-parser')();
const cors = require('cors')({ origin: true });

module.exports = (exp, functions, admin) => {
  const config = functions.config();
  const app = express();
  const { Theme, Fetcher } = require(config.application.theme);

  const fetcher = Fetcher(config.application);
  const plugins = (config.application.plugins || []).map(plugin =>
    require(plugin)
  );
  const theme = Theme(
    Object.assign(
      {},
      config.application,
      process.env.NODE_ENV !== 'production'
        ? {
            basename: `/${process.env.GCLOUD_PROJECT}/us-central1/${
              process.env.FUNCTION_NAME
            }`,
          }
        : {}
    ),
    plugins
  );

  try {
    admin.initializeApp(config.firebase);
  } catch (e) {
    // if it throws, it means it has already been initialized and can be ignored
  }

  const collections = config.application.article.collections;
  const caching = config.application.caching;
  const noindex = config.application.noindex;
  const tagPath = config.application.tagpath;

  const firestore = admin.firestore();
  const ledger = firestore.collection('ledger');
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

  const paginationRegex = ':page([2-9]|[1-9]\\d+)';

  // pages (incl. start)
  // serverless
  // tags
  app.get(`/sitemap.xml`, (req, res) => {
    fetcher
      .sitemap(firestore.collection('indexes/start/pagination'))
      .then(data => res.send(theme.sitemap(data)))
      .catch(err => {
        console.error(err);
        res.status(500).send('Something broke!');
      });
  });

  app.get(`/sitemap-pages.xml`, (req, res) => {
    fetcher
      .sitemap(firestore.collection('indexes/start/pagination'))
      .then(data => res.send(theme.sitemapPages(data)))
      .catch(err => {
        console.error(err);
        res.status(500).send('Something broke!');
      });
  });

  app.get(`/(${paginationRegex})?`, (req, res) => {
    const page = parseInt(req.params.page, 10) || 1;
    fetcher
      .start(
        firestore.collection('indexes/start/pagination'),
        articles,
        refs => firestore.getAll(...refs),
        page
      )
      .then(data => res.send(theme.start(data)))
      .catch(err => {
        console.error(err);
        res.status(500).send('Something broke!');
      });
  });

  Object.keys(collections).forEach(collection => {
    const collectionPath = collections[collection].slug;

    app.get(`/${collectionPath}(/${paginationRegex})?`, (req, res) => {
      const page = parseInt(req.params.page, 10) || 1;
      fetcher
        .portal(
          collection,
          firestore.collection('indexes/collections/pagination'),
          articles,
          refs => firestore.getAll(...refs),
          page
        )
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

    app.get(`/sitemap-${collectionPath}.xml`, (req, res) => {
      fetcher
        .sitemapCollection(
          firestore.collection('indexes/collections/pagination'),
          collection
        )
        .then(data => res.send(theme.sitemapCollection(data)))
        .catch(err => {
          console.error(err);
          res.status(500).send('Something broke!');
        });
    });
  });

  app.get(`/${tagPath}/(:tag)(/${paginationRegex})?`, (req, res) => {
    const page = parseInt(req.params.page, 10) || 1;
    fetcher
      .tagged(
        req.params.tag,
        firestore.collection('indexes/tags/pagination'),
        articles,
        pages,
        refs => firestore.getAll(...refs),
        page
      )
      .then(data => res.send(theme.tagged(data)))
      .catch(err => {
        console.log(err);
        if (err.message === '404') {
          return res.status(404).send('Page not found');
        }
        res.status(500).send('Something broke!');
      });
  });

  app.get('/:page', (req, res, next) => {
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

  exp.ectoplasm = functions.https.onRequest(app);
};
