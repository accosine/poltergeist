module.exports = config => {
  const pagerSize = config.pager.size;
  return {
    start: (articles, ledger, page) =>
      Promise.all([
        ledger
          .doc('counter')
          .get()
          .then(snapshot =>
            Object.values(snapshot.data().articles).reduce((acc, x) => acc + x)
          ),
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
          .orderBy('typeSequence')
          .startAt((page - 1) * pagerSize + 1)
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

    portal: (articles, collection, ledger, page) =>
      Promise.all([
        ledger
          .doc('counter')
          .get()
          .then(snapshot => snapshot.data().articles[collection]),
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
          .orderBy('collectionSequence')
          .startAt((page - 1) * pagerSize + 1)
          .limit(parseInt(pagerSize, 10))
          .get(),
      ]).then(([articleCount, documentSnapshots]) => {
        if (Math.ceil(articleCount / pagerSize) < page) {
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
