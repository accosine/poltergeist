const amphtmlValidator = require('amphtml-validator');
const Theme = require('./Theme').default;
const { config, article1, page1 } = require('./fixtures');
const { article, page, portal, start } = Theme(config.application, []);

const printValidatorErrors = result => {
  for (var ii = 0; ii < result.errors.length; ii++) {
    var error = result.errors[ii];
    var msg =
      'line ' + error.line + ', col ' + error.col + ': ' + error.message;
    if (error.specUrl !== null) {
      msg += ' (see ' + error.specUrl + ')';
    }
    (error.severity === 'ERROR' ? console.error : console.warn)(msg);
  }
};

const validateAmp = async html => {
  const validator = await amphtmlValidator.getInstance();

  const result = validator.validateString(html);
  if (result.status !== 'PASS') {
    printValidatorErrors(result);
  }
  expect(result.status).toEqual('PASS');
};

describe('Smoke tests', () => {
  it('renders an article', async () => {
    const html = article(article1);

    [
      expect.stringMatching(/<!doctype html><html ⚡ lang="en">/),
      expect.stringMatching(/<\/html>/),
      expect.stringMatching(/<head>/),
      expect.stringMatching(/<body class="([a-z]+ ?)+">/),
      expect.stringMatching(/<article class="([a-z]+ ?)+">/),
    ].forEach(match => expect(html).toEqual(match));

    await validateAmp(html);
  });

  it('renders a page', async () => {
    const html = page(page1);

    [
      expect.stringMatching(/<!doctype html><html ⚡ lang="en">/),
      expect.stringMatching(/<\/html>/),
      expect.stringMatching(/<head>/),
      expect.stringMatching(/<body class="([a-z]+ ?)+">/),
      expect.stringMatching(/<article class="([a-z]+ ?)+">/),
    ].forEach(match => expect(html).toEqual(match));

    await validateAmp(html);
  });

  it('renders the start page', async () => {
    const articles = [article1, article1, article1, article1];
    const html = start({
      articles,
      frontmatter: {
        pagination: {
          currentPage: 1,
          pagerSize: 2,
          articleCount: articles.length,
        },
      },
    });

    [
      expect.stringMatching(/<!doctype html><html ⚡ lang="en">/),
      expect.stringMatching(/<\/html>/),
      expect.stringMatching(/<head>/),
      expect.stringMatching(/<body class="([a-z]+ ?)+">/),
      expect.stringMatching(/<main id="main" role="main" class="([a-z]+ ?)+">/),
    ].forEach(match => expect(html).toEqual(match));

    await validateAmp(html);
  });

  it('renders a portal page', async () => {
    const articles = [article1, article1, article1, article1];
    const html = portal({
      articles,
      frontmatter: {
        collection: 'Music',
        pagination: {
          currentPage: 1,
          pagerSize: 2,
          articleCount: articles.length,
        },
      },
    });

    [
      expect.stringMatching(/<!doctype html><html ⚡ lang="en">/),
      expect.stringMatching(/<\/html>/),
      expect.stringMatching(/<head>/),
      expect.stringMatching(/<body class="([a-z]+ ?)+">/),
      expect.stringMatching(/<main id="main" role="main" class="([a-z]+ ?)+">/),
    ].forEach(match => expect(html).toEqual(match));

    await validateAmp(html);
  });
});
