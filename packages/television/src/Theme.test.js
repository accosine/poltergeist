const Theme = require('./Theme').default;
const { config, article1, page1 } = require('./fixtures');
const { article, page, portal, start } = Theme(config.application, []);

describe('Smoke tests', () => {
  it('renders an article', () => {
    const html = article(article1);
    expect(html).toMatchSnapshot();
  });

  it('renders a page', () => {
    const html = page(page1);
    expect(html).toMatchSnapshot();
  });

  it('renders the start page', () => {
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
    expect(html).toMatchSnapshot();
  });

  it('renders a portal page', () => {
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
    expect(html).toMatchSnapshot();
  });
});
