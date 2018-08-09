const { createServer } = require('http');
const config = require('./config.json');
const { Theme } = require('./dist');
const theme = Theme(config.application);
const articles = require('./articles.json');
const article = require('./article.json');

const PORT = 8080;

createServer((req, res) => {
  switch (req.url) {
    case '/':
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(theme.start(articles));
      res.end();
      break;
    case '/article':
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(theme.article(article.content, article.frontmatter));
      res.end();
      break;
    default:
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(``);
      res.end();
  }
}).listen(PORT, () =>
  console.log(`Development server running: http://localhost:${PORT}`)
);
