const { createServer } = require('http');
const config = require('./config.json');
const { Theme } = require('./dist');
const theme = Theme(config.application);
const articles = require('./articles.json');
const article = require('./article.json');

const PORT = process.env.PORT || 8080;

createServer((req, res) => {
  switch (req.url) {
    case '/':
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(
        theme.start({
          articles,
          frontmatter: {
            pagination: {
              currentPage: 0,
              pagerSize: config.application.pagerSize,
              articleCount: articles.length,
            },
          },
        })
      );
      res.end();
      break;
    case '/article':
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(theme.article(articles[0]));
      res.end();
      break;
    case '/tagged':
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(theme.article(article.content, article.frontmatter));
      res.end();
      break;
    case '/portal':
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(theme.article(article.content, article.frontmatter));
      res.end();
      break;
    default:
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write('Not found');
      res.end();
  }
}).listen(PORT, () =>
  console.log(`Development server running: http://localhost:${PORT}`)
);
