const request = require('supertest');
const ectoplasm = require('./');

const mockConfig = {
  application: {
    theme: 'test-theme',
    article: {
      collectionsorder: ['collection1'],
      collections: {
        collection1: {
          name: 'first collection',
          slug: 'collection1',
        },
      },
    },
    caching: {},
    noindex: false,
    tagpath: 'tag',
  },
};

const functions = {
  config: () => mockConfig,
  https: { onRequest: app => app },
};
const admin = { firestore: () => ({ collection: c => c }) };

const mockTheme = (mockType, fetcherData, themeData) => {
  const mockFetcher = jest.fn().mockResolvedValue(fetcherData);
  const mockTheme = jest.fn().mockReturnValue(themeData);
  jest.mock(
    'test-theme',
    () => ({
      Fetcher: config => ({ [mockType]: mockFetcher }),
      Theme: config => ({ [mockType]: mockTheme }),
    }),
    { virtual: true }
  );
  return [mockFetcher, mockTheme];
};

const getApp = (functions, admin) => {
  const exp = {};
  ectoplasm(exp, functions, admin);
  return exp.ectoplasm;
};

beforeEach(() => {
  jest.resetModules();
});

describe('start route', () => {
  test('/ calls fetcher and theme with page 1', async () => {
    const data = 'page 1 data';
    const text = 'page 1 text';
    const [fetcher, theme] = mockTheme('start', data, text);
    const app = getApp(functions, admin);

    const response = await request(app).get('/');

    expect(response.statusCode).toBe(200);
    expect(response.text).toBe(text);
    expect(fetcher).toBeCalledWith('articles', 'ledger', 1);
    expect(theme).toBeCalledWith(data);
  });

  test('/2 calls fetcher and theme with page 2', async () => {
    const data = 'page 2 data';
    const text = 'page 2 text';
    const [fetcher, theme] = mockTheme('start', data, text);
    const app = getApp(functions, admin);

    const response = await request(app).get('/2');

    expect(response.statusCode).toBe(200);
    expect(response.text).toBe(text);
    expect(fetcher).toBeCalledWith('articles', 'ledger', 2);
    expect(theme).toBeCalledWith(data);
  });

  test('/11 calls fetcher and theme with page 11', async () => {
    const data = 'page 11 data';
    const text = 'page 11 text';
    const [fetcher, theme] = mockTheme('start', data, text);
    const app = getApp(functions, admin);

    const response = await request(app).get('/11');

    expect(response.statusCode).toBe(200);
    expect(response.text).toBe(text);
    expect(fetcher).toBeCalledWith('articles', 'ledger', 11);
    expect(theme).toBeCalledWith(data);
  });
});

describe('portal route', () => {
  test('/collection1 calls fetcher and theme with page 1', async () => {
    const data = 'page 1 data';
    const text = 'page 1 text';
    const [fetcher, theme] = mockTheme('portal', data, text);
    const app = getApp(functions, admin);

    const response = await request(app).get('/collection1');

    expect(response.statusCode).toBe(200);
    expect(response.text).toBe(text);
    expect(fetcher).toBeCalledWith('articles', 'collection1', 'ledger', 1);
    expect(theme).toBeCalledWith(data);
  });

  test('/collection1/2 calls fetcher and theme with page 2', async () => {
    const data = 'page 2 data';
    const text = 'page 2 text';
    const [fetcher, theme] = mockTheme('portal', data, text);
    const app = getApp(functions, admin);

    const response = await request(app).get('/collection1/2');

    expect(response.statusCode).toBe(200);
    expect(response.text).toBe(text);
    expect(fetcher).toBeCalledWith('articles', 'collection1', 'ledger', 2);
    expect(theme).toBeCalledWith(data);
  });

  test('/collection1/11 calls fetcher and theme with page 11', async () => {
    const data = 'page 11 data';
    const text = 'page 11 text';
    const [fetcher, theme] = mockTheme('portal', data, text);
    const app = getApp(functions, admin);

    const response = await request(app).get('/collection1/11');

    expect(response.statusCode).toBe(200);
    expect(response.text).toBe(text);
    expect(fetcher).toBeCalledWith('articles', 'collection1', 'ledger', 11);
    expect(theme).toBeCalledWith(data);
  });
});

describe('article route', () => {
  test('/collection1/article1 calls fetcher and theme correctly', async () => {
    const data = 'article1 data';
    const text = 'article1 text';
    const [fetcher, theme] = mockTheme('article', data, text);
    const app = getApp(functions, admin);

    const response = await request(app).get('/collection1/article1');

    expect(response.statusCode).toBe(200);
    expect(response.text).toBe(text);
    expect(fetcher).toBeCalledWith('articles', 'article1', 'collection1');
    expect(theme).toBeCalledWith(data);
  });
});

describe('page route', () => {
  test('/page1 calls fetcher and theme correctly', async () => {
    const data = 'page1 data';
    const text = 'page1 text';
    const [fetcher, theme] = mockTheme('page', data, text);
    const app = getApp(functions, admin);

    const response = await request(app).get('/page1');

    expect(response.statusCode).toBe(200);
    expect(response.text).toBe(text);
    expect(fetcher).toBeCalledWith('pages', 'page1');
    expect(theme).toBeCalledWith(data);
  });
});

describe('tag route', () => {
  test('/tag/tag1 calls fetcher and theme correctly', async () => {
    const data = 'tag1 data';
    const text = 'tag1 text';
    const [fetcher, theme] = mockTheme('tagged', data, text);
    const app = getApp(functions, admin);

    const response = await request(app).get('/tag/tag1');

    expect(response.statusCode).toBe(200);
    expect(response.text).toBe(text);
    expect(fetcher).toBeCalledWith(
      'tag1',
      'tags',
      'articles',
      'pages',
      expect.objectContaining({ collection: expect.any(Function) }),
      1
    );
    expect(theme).toBeCalledWith(data);
  });

  test('/tag/tag1/2 calls fetcher and theme correctly', async () => {
    const data = 'tag1 data';
    const text = 'tag1 text';
    const [fetcher, theme] = mockTheme('tagged', data, text);
    const app = getApp(functions, admin);

    const response = await request(app).get('/tag/tag1/2');

    expect(response.statusCode).toBe(200);
    expect(response.text).toBe(text);
    expect(fetcher).toBeCalledWith(
      'tag1',
      'tags',
      'articles',
      'pages',
      expect.objectContaining({ collection: expect.any(Function) }),
      2
    );
    expect(theme).toBeCalledWith(data);
  });

  test('/tag/tag1/11 calls fetcher and theme correctly', async () => {
    const data = 'tag1 data';
    const text = 'tag1 text';
    const [fetcher, theme] = mockTheme('tagged', data, text);
    const app = getApp(functions, admin);

    const response = await request(app).get('/tag/tag1/11');

    expect(response.statusCode).toBe(200);
    expect(response.text).toBe(text);
    expect(fetcher).toBeCalledWith(
      'tag1',
      'tags',
      'articles',
      'pages',
      expect.objectContaining({ collection: expect.any(Function) }),
      11
    );
    expect(theme).toBeCalledWith(data);
  });
});
