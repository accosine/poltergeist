module.exports = config => {
  const pagerSize = config.pager.size;
  return {
    start: (articles, page) =>
      Promise.all([
        articles
          .select()
          .where('published', '==', true)
          .get()
          .then(emptySelectSnapshot => emptySelectSnapshot.docs.length),
        articles
          .select(
            'collection',
            'date',
            'slug',
            'headline',
            'subline',
            'picture',
            'attribution',
            'alt'
          )
          .where('published', '==', true)
          .orderBy('date')
          .offset((page - 1) * pagerSize)
          .limit(parseInt(pagerSize, 10))
          .get(),
      ]).then(([articleCount, documentSnapshots]) => {
        if (!documentSnapshots.docs.length) {
          throw new Error('404');
        }
        return {
          articles: documentSnapshots.docs.map(article => article.data()),
          frontmatter: {
            pagination: {
              currentPage: parseInt(page, 10),
              pagerSize,
              articleCount,
            },
          },
        };
      }),

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

    portal: (articles, collection, page) =>
      Promise.all([
        articles
          .select()
          .where('collection', '==', collection)
          .where('published', '==', true)
          .get()
          .then(emptySelectSnapshot => emptySelectSnapshot.docs.length),
        articles
          .select(
            'slug',
            'headline',
            'subline',
            'picture',
            'attribution',
            'alt'
          )
          .where('collection', '==', collection)
          .where('published', '==', true)
          .orderBy('date')
          .offset((page - 1) * pagerSize)
          .limit(parseInt(pagerSize, 10))
          .get(),
      ]).then(([articleCount, documentSnapshots]) => {
        if (Math.ceil(articleCount / pagerSize) > page) {
          throw new Error('404');
        }
        return {
          articles: documentSnapshots.docs.map(article => article.data()),
          frontmatter: {
            collection,
            pagination: {
              currentPage: parseInt(page, 10),
              pagerSize,
              articleCount,
            },
          },
        };
      }),
  };
};
