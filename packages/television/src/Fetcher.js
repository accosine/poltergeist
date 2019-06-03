module.exports = config => {
  const pagerSize = config.pager.size;
  return {
    start: async (index, articles, getAll, page) => {
      const ARTICLE_PREFIX = 'article__';
      const slugsSnapshot = await index.doc('all').get();
      const slugs = slugsSnapshot.exists ? slugsSnapshot.data().slugs : [];

      if (!slugs.length) {
        throw new Error('404');
      }

      const pageSlugs = slugs.slice(
        (page - 1) * pagerSize,
        (page - 1) * pagerSize + pagerSize
      );

      if (!pageSlugs.length) {
        throw new Error('404');
      }

      // TODO: add type (article/page) to doc
      const refs = pageSlugs
        .filter(slug => slug.startsWith(ARTICLE_PREFIX))
        .map(slug => articles.doc(slug.slice(ARTICLE_PREFIX.length)));

      const articleDocs = await getAll(refs);
      return {
        articles: articleDocs.map(article => article.data()),
        frontmatter: {
          pagination: {
            currentPage: parseInt(page, 10),
            pagerSize,
            articleCount: refs.length,
          },
        },
      };
    },

    page: (pages, slug) =>
      pages
        .doc(slug)
        .get()
        .then(doc => {
          if (doc.exists) {
            const page = doc.data();
            if (!page.published) {
              throw new Error('404');
            }
            return page;
          } else {
            throw new Error('404');
          }
        }),

    article: (articles, slug, collection) =>
      articles
        .doc(slug)
        .get()
        .then(doc => {
          if (doc.exists) {
            const article = doc.data();
            if (article.collection !== collection || !article.published) {
              throw new Error('404');
            }
            return article;
          } else {
            throw new Error('404');
          }
        }),

    portal: async (collection, index, articles, getAll, page) => {
      const ARTICLE_PREFIX = 'article__';
      const slugsSnapshot = await index.doc(collection).get();
      const slugs = slugsSnapshot.exists ? slugsSnapshot.data().slugs : [];

      if (!slugs.length) {
        throw new Error('404');
      }

      const pageSlugs = slugs.slice(
        (page - 1) * pagerSize,
        (page - 1) * pagerSize + pagerSize
      );

      if (!pageSlugs.length) {
        throw new Error('404');
      }

      // TODO: add type (article/page) to doc
      const refs = pageSlugs
        .filter(slug => slug.startsWith(ARTICLE_PREFIX))
        .map(slug => articles.doc(slug.slice(ARTICLE_PREFIX.length)));

      const articleDocs = await getAll(refs);
      return {
        articles: articleDocs.map(article => article.data()),
        frontmatter: {
          collection,
          pagination: {
            currentPage: parseInt(page, 10),
            pagerSize,
            articleCount: refs.length,
          },
        },
      };
    },

    tagged: async (tag, index, articles, pages, getAll, page) => {
      const PAGE_PREFIX = 'page__';
      const ARTICLE_PREFIX = 'article__';
      const slugsSnapshot = await index.doc(tag).get();
      const slugs = slugsSnapshot.exists ? slugsSnapshot.data().slugs : [];

      if (!slugs.length) {
        throw new Error('404');
      }

      const pageSlugs = slugs.slice(
        (page - 1) * pagerSize,
        (page - 1) * pagerSize + pagerSize
      );

      if (!pageSlugs.length) {
        throw new Error('404');
      }

      // TODO: add type (article/page) to doc
      const refs = pageSlugs.map(slug =>
        slug.startsWith(PAGE_PREFIX)
          ? pages.doc(slug.slice(PAGE_PREFIX.length))
          : articles.doc(slug.slice(ARTICLE_PREFIX.length))
      );

      const taggedDocs = await getAll(refs);
      return {
        documents: taggedDocs.map(doc => doc.data()),
        frontmatter: {
          tag,
          pagination: {
            currentPage: parseInt(page, 10),
            pagerSize,
            documentCount: slugs.length,
          },
        },
      };
    },
  };
};
