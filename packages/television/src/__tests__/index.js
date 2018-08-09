const theme = require('../').default;
const { config, article1 } = require('./fixtures');

it('renders an article', () => {
  const html = theme(config).article(article1.text, article1.frontmatter);
  expect(html).toMatchSnapshot();
});
